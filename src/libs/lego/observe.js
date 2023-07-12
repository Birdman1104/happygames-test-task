function adjustEventName(str) {
  const clean = str.replace(/[^0-9a-z-A-Z]/g, "").replace(/ +/, " ");

  return `${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
}

export class Observe {
  _lego;
  constructor(lego) {
    this._lego = lego;
  }

  makeObservable(obj, ...props) {
    if (!props.length) {
      props = Object.keys(obj);
    }

    for (const prop of props) {
      const value = obj[prop];
      if (delete obj[prop]) {
        this.createObservable(obj, prop, value);
      }
    }
  }

  removeObservable(obj, ...props) {
    if (!props.length) {
      props = Object.keys(obj);
    }

    for (const prop of props) {
      const value = obj[prop];
      if (delete obj[prop]) {
        Object.defineProperty(obj, prop, {
          configurable: true,
          enumerable: true,
          writable: true,
          value,
        });
      }
    }
  }

  createObservable(obj, prop, value) {
    const eventName = `${obj.__name__}${adjustEventName(prop)}Update`;
    let oldValue = value;
    let newValue = oldValue;

    Object.defineProperty(obj, prop, {
      configurable: true,
      enumerable: true,
      get: () => {
        return newValue;
      },
      set: (val) => {
        if (val === newValue) {
          return;
        }

        oldValue = newValue;
        newValue = val;

        this._lego.event.emit(eventName, newValue, oldValue, obj.uuid);
      },
    });
  }
}
