export function Mixin(classes: any[], ignoreConstructor = true) {
  return (target: Function) => {
    classes.forEach((clas) => {
      Object.getOwnPropertyNames(clas.prototype).forEach((name) => {
        if (ignoreConstructor && name === 'constructor') return;
        const propDesc = Object.getOwnPropertyDescriptor(clas.prototype, name);
        Object.defineProperty(target.prototype, name, propDesc);
      });
    });
  };
}
