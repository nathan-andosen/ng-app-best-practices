import { Injectable } from '@angular/core';
// https://medium.com/@damoresac/using-web-workers-on-angular-6-6fd0490d07b5
// Credits to: https://github.com/start-javascript/ngx-web-worker/blob/master/web-worker.ts

/**
 * Web worker service that creates a web worker script from a given function.
 * It also executes the web worker and returns a promise.
 */
@Injectable({
  providedIn: 'root'
})
export class WebWorkerService {
  private workerFunctionToUrlMap = new WeakMap<(input: any) => any, string>();
  private promiseToWorkerMap = new WeakMap<Promise<any>, Worker>();


  /**
   * Method that runs the given function with the given data.
   *
   * @template T
   * @param {(input: any) => T} workerFunction function to run on the web
   *  worker context
   * @param {*} [data] data to pass to the web worker context. IMPORTANT: the
   *  function must be self-contained, meaning that no external functions or
   *  libraries can be passed through this parameter.
   * @returns {Promise<T>}
   * @memberof WebWorkerService
   */
  public run<T>(workerFunction: (input: any) => T, data?: any): Promise<T> {
    const url = this.getOrCreateWorkerUrl(workerFunction);
    return this.runUrl(url, data);
  }


  /**
   * Method that runs the given ObjectURL with the given data.
   *
   * @param {string} url ObjectURL to run on the web worker context.
   * @param {*} [data] data to pass to the web worker context.
   * @returns {Promise<any>}
   * @memberof WebWorkerService
   */
  public runUrl(url: string, data?: any): Promise<any> {
    const worker = new Worker(url);
    const promise = this.createPromiseForWorker(worker, data);
    const promiseCleaner = this.createPromiseCleaner(promise);
    this.promiseToWorkerMap.set(promise, worker);
    promise.then(promiseCleaner).catch(promiseCleaner);
    return promise;
  }


  /**
   * Method that terminates the given Promise and removes it from the
   * internal service maps.
   *
   * @template T
   * @param {Promise<T>} promise
   * @returns {Promise<T>}
   * @memberof WebWorkerService
   */
  public terminate<T>(promise: Promise<T>): Promise<T> {
    return this.removePromise(promise);
  }


  /**
   * Method that retrieves the web worker to which the given Promise belongs to.
   *
   * @param {Promise<any>} promise
   * @returns {Worker}
   * @memberof WebWorkerService
   */
  public getWorker(promise: Promise<any>): Worker {
    return this.promiseToWorkerMap.get(promise);
  }


  /**
   * Method that handles the promise creation for the given web worker
   * with the given input data.
   *
   * @private
   * @template T
   * @param {Worker} worker
   * @param {*} data
   * @returns
   * @memberof WebWorkerService
   */
  private createPromiseForWorker<T>(worker: Worker, data: any) {
    return new Promise<T>((resolve, reject) => {
      worker.addEventListener('message', (event) => resolve(event.data));
      worker.addEventListener('error', reject);
      worker.postMessage(data);
    });
  }


  /**
   * Method that allocates a web worker ObjectURL for the given function.
   * It's used to create caches for the (function, workerUrl) pairs in order
   * to avoid creating the urls more than once.
   *
   * @private
   * @param {Function} fn
   * @returns {string}
   * @memberof WebWorkerService
   */
  private getOrCreateWorkerUrl(fn: (input: any) => any): string {
    if (!this.workerFunctionToUrlMap.has(fn)) {
      const url = this.createWorkerUrl(fn);
      this.workerFunctionToUrlMap.set(fn, url);
      return url;
    }
    return this.workerFunctionToUrlMap.get(fn);
  }


  /**
   * Method that creates a web worker ObjectURL from the given Function object.
   *
   * @private
   * @param {Function} resolve
   * @returns {string}
   * @memberof WebWorkerService
   */
  private createWorkerUrl(resolve: (input: any) => any): string {
    const resolveString = resolve.toString();
    // The template is basically an addEventListener attachment that creates a
    // closure (IIFE*) with the provided function and invokes it with the
    // provided data.
    // * IIFE stands for immediately Immediately-Invoked Function Expression
    // Removed the postMessage from this template in order to allow worker
    // functions to use asynchronous functions and resolve whenever they need to
    const webWorkerTemplate = `
      self.addEventListener('message', function(e) {
        ((${resolveString})(e.data));
      });
    `;
    const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
    return URL.createObjectURL(blob);
  }


  /**
   * Method that creates a function that removes the given promise from the
   * service context.
   *
   * @private
   * @template T
   * @param {Promise<T>} promise
   * @returns {(input: any) => T}
   * @memberof WebWorkerService
   */
  private createPromiseCleaner<T>(promise: Promise<T>): (input: any) => T {
    return (event) => {
      this.removePromise(promise);
      return event;
    };
  }


  /**
   * Method that removes the given promise from the service context.
   * It also terminates the associated worker in case it exists.
   *
   * @private
   * @template T
   * @param {Promise<T>} promise
   * @returns {Promise<T>}
   * @memberof WebWorkerService
   */
  private removePromise<T>(promise: Promise<T>): Promise<T> {
    const worker = this.promiseToWorkerMap.get(promise);
    if (worker) {
      worker.terminate();
    }
    this.promiseToWorkerMap.delete(promise);
    return promise;
  }
}
