/**
 * Determine if an object is set (not equal to undefined or null)
 *
 * @export
 * @param {*} obj
 * @returns
 */
export function isSet(obj: any) {
  return (typeof obj !== 'undefined' && obj !== null);
}
