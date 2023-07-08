const getUUID = (() => {
  let i = 0;
  return (name = "") => `${name}${++i}`;
})();

class ObservableModel {
  _name;
  #uuid;

  constructor(name) {
    this._name = name;
    this.#uuid = getUUID(this._name);
  }

  get uuid() {
    return this.#uuid;
  }

  initialize() {
    //
  }

  destroy() {
    //
  }
}

export default ObservableModel;
