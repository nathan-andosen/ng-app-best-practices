import { Component } from '@angular/core';






// Arguments passed to the EventListener decorator
interface IEventListenerArgs {
  eventName: string;
  eventClass?: string;
  initFn?: string;
  destroyFn?: string;
}


/**
 * Get the property name that points to the class that extends or uses the
 * EventManager class
 *
 * @param {IEventListenerArgs} args
 * @param {*} classInstance
 * @returns {string}
 */
function getClassPropertyName(args: IEventListenerArgs, instance: any): string {
  if (!args.eventClass) return null;
  const classKeys = Object.keys(instance);
  for (const key of classKeys) {
    if (instance[key].constructor.name === args.eventClass) return key;
  }
  throw new Error('@EventListener: Unable to find class with name '
    + args.eventClass);
}


/**
 * Get the instance of the EventManager class
 *
 * @param {IEventListenerArgs} args
 * @param {*} classInstance
 * @returns {*}
 */
function getEventClass(args: IEventListenerArgs, classInstance: any): any {
  const propertyName = getClassPropertyName(args, classInstance);
  const instance = (propertyName) ? classInstance[propertyName] : classInstance;
  if (!instance.on) {
    // lets check if the instance has an 'events' property
    if (instance.events && instance.events.on) {
      return instance.events;
    }
    throw new Error('@EventListener: Class ' + instance.constructor.name
      + ' must extend EventManager');
  }
  return instance;
}


/**
 * Listen to events that are fired from EventManager classes
 *
 * @export
 * @param {(string|IEventListenerArgs)} arg1
 * @param {string} [arg2]
 * @returns
 */
export function EventListenerTwo () {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    if (!descriptor || typeof descriptor.value !== 'function') {
      throw new Error('@EventListener: Decorator must be applied to a method');
    }

    // if (!arg1
    // || (typeof arg1 !== 'string' && arg1.constructor !== {}.constructor)) {
    //   throw new Error('@EventListener: First argument must be of type string '
    //     + 'or IEventListenerArgs');
    // }

    // const params = (typeof arg1 === 'string')
    //   ? { eventName: arg1, eventClass: arg2 } : arg1;
    // const initFnName = (params.initFn || 'ngOnInit');
    // const destroyFnName = (params.destroyFn || 'ngOnDestroy');
    // let eventClassInstance = null;

    const initFnName = 'ngOnInit';
    const destroyFnName = 'ngOnDestroy';

    // hook into our init function so we can bind to an event
    const initFnOrignal = (target[initFnName] || function(){});
    target.constructor.prototype[initFnName] = function() {
      initFnOrignal.apply(this, arguments);
      console.log('---- INSIDE TWO INIT xxxxxxxxxxxxxxxxxxxxxxxxx ---------');
    };

    // hook into our destroy function so we can unbind from an event
    const destroyFnOriginal = (target[destroyFnName] || function(){});
    target.constructor.prototype[destroyFnName] = function() {
      destroyFnOriginal.apply(this, arguments);
      console.log('---- DESTROY ---------');
    };
  };
};





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-app-best-practices';



  // @EventListenerTwo()
  // test(){}
}
