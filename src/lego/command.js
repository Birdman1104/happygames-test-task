export class Command {
  _guards = [];
  _payloads = [];

  constructor(_lego) {
    //
  }

  on(event, command) {
    this._lego.event.on(event, command);

    return this;
  }

  once(event, command) {
    this._lego.event.once(event, command);

    return this;
  }

  off(event, command) {
    this._lego.event.off(event, command);

    return this;
  }

  execute(command) {
    const { _guards: guards, _payloads: payloads } = this;

    const passed = !guards.length || !guards.find((guard) => !guard(...payloads));

    this._resetGuardsAndPayloads();
    if (passed) {
      this._payloads = [command(...payloads)];
    }

    return this;
  }

  async executeAsync(command) {
    const { _guards: guards, _payloads: payloads } = this;

    const passed = !guards.length || !guards.find((guard) => !guard(...payloads));

    this._resetGuardsAndPayloads();
    if (passed) {
      return await command(...payloads);
    }

    return this;
  }

  payload(...args) {
    this._payloads = args;

    return this;
  }

  guard(...args) {
    this._guards = args;

    return this;
  }

  _resetGuardsAndPayloads() {
    this._guards = [];
    this._payloads = [];
  }
}
