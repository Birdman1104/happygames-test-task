export class Logger {
  _event;
  _command;
  _config;
  _gap = 0;

  start(lego, debugConfig) {
    const { event, command } = lego;
    this._event = event;
    this._command = command;
    this._config = this._getConfig(debugConfig);

    this._patchEvents()._patchCommands()._patchNot(lego);
  }

  _patchNot(lego) {
    const patchNot = (fn) => {
      const wrappedFn = (...args) => {
        return !fn(...args);
      };

      const wrappedFnDescriptor = Object.getOwnPropertyDescriptor(wrappedFn, "name");

      if (!wrappedFnDescriptor.configurable) {
        return wrappedFn;
      }

      const upperCaseName = fn.name.charAt(0).toUpperCase() + fn.name.slice(1);

      Object.defineProperties(wrappedFn, {
        name: { value: `not${upperCaseName}` },
      });

      return wrappedFn;
    };

    lego.not = patchNot;

    return this;
  }

  _patchEvents() {
    const originalEmit = this._event.emit.bind(this._event);
    const { debugEvents, excludedEvents } = this._config;

    if (debugEvents) {
      this._event.emit = (name, ...args) => {
        if (excludedEvents?.length && excludedEvents.indexOf(name) !== -1) {
          return originalEmit(name, ...args);
        }

        this._gap += 1;
        this._debugEmit(name, ...args);
        const emitResult = originalEmit(name, ...args);
        this._gap -= 1;

        return emitResult;
      };
    }

    return this;
  }

  _patchCommands() {
    const { debugCommand, debugGuards } = this._config;

    if (debugCommand) {
      const originalExecute = this._command.execute.bind(this._command);
      this._command.execute = (command) => {
        const guards = this._command._guards;
        const payloads = this._command._payloads;

        if (debugGuards && guards.length) {
          this._gap += 1;
          this._debugGuards(command, guards, payloads);
          this._gap -= 1;
        } else {
          this._gap += 1;
          this._debugCommand(command);
          this._gap -= 1;
        }

        return originalExecute(command);
      };

      const originalAsyncExecute = this._command.executeAsync.bind(this._command);
      this._command.executeAsync = (command) => {
        const guards = this._command._guards;
        const payloads = this._command._payloads;

        if (debugGuards && guards.length) {
          this._gap += 1;
          this._debugGuards(command, guards, payloads);
          this._gap -= 1;
        } else {
          this._gap += 1;
          this._debugCommand(command);
          this._gap -= 1;
        }

        return originalAsyncExecute(command);
      };
    }

    return this;
  }

  _getStyle(background, color) {
    const { fontSize, padding, fontFamily } = this._config;
    return `background: ${background}; color: ${color}; font-size: ${fontSize}px; font-family: "${fontFamily}"; font-weight: bold; padding: ${padding}px;`;
  }

  _debugEmit(event, ...args) {
    const { debugEventArguments, debugRedundantEventFlag } = this._config;

    const logStyle = [this._getStyle("#C3E6CB", "#000000")];

    let message = `${this._getSpace()}%c ${event} `;

    if (debugEventArguments && args.length > 0) {
      logStyle.push(this._getStyle("#BDE5EB", "#000000"));
      const argsMsg = args.reduce((msg, arg, index) => {
        logStyle.push(this._getStyle(index % 2 === 0 ? "#FDFDFE" : "#C6C8CA", "#000000"));
        return (msg += `%c  ${arg} `);
      }, "");
      message += `%c  \u21E8  ${argsMsg}`;
    }

    if (debugRedundantEventFlag) {
      const listeners = this._event.listeners(event);
      if (listeners.length === 0) {
        logStyle.push(this._getStyle("#FFEEBA", "#000000"));
        message += `%c ⚠️`;
      }
    }

    this._log(message, ...logStyle);
  }

  async _debugGuards(command, guards, payloads) {
    const notPassedGuard = guards.find((guard) => !guard.call(undefined, ...payloads));
    const passed = !notPassedGuard;

    const logStyle = [this._getStyle("#D6D8DB", "#000000")];
    let message = `${this._getSpace()}%c ${command.name} `;
    for (const guard of guards) {
      logStyle.push(this._getStyle("#FDFDFE", "#000000"));
      message += `%c ${guard.name} `;
      if (guard === notPassedGuard) {
        message += ` 🛑 `;
        break;
      } else {
        message += ` ✅ `;
      }
    }
    if (!passed) {
      logStyle[0] = logStyle[0] + " text-decoration: line-through;";
    }
    this._log(message, ...logStyle);
  }

  _debugCommand(command) {
    this._log(`${this._getSpace()}%c ${command.name} `, this._getStyle("#B8DAFF", "#000000"));
  }

  _getSpace() {
    return this._gap === 0 ? "" : " ".repeat(this._gap - 1);
  }

  _log(value, ...args) {
    console.log(value, ...args);
  }

  _getConfig(rawConfig) {
    const defaults = {
      debugGuards: true,
      debugCommand: true,
      debugEventArguments: true,
      debugRedundantEventFlag: true,
      debugEvents: true,
      fontSize: 12,
      excludedEvents: [""],
      padding: 1,
      fontFamily: "Arial",
    };

    return Object.assign(defaults, rawConfig);
  }
}
