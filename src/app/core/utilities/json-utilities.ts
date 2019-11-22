
/**
 * Deep clone of a json object
 *
 * @export
 * @param {*} obj
 * @returns {*}
 */
export function cloneJson(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}
