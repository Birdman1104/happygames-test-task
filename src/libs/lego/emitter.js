export class Emitter extends EventEmitter {
  constructor(_lego) {
    super();
  }

  removeListenersOf(_context) {
    const events = this._events;

    Object.keys(events).forEach((event) => {
      const entry = events[event];
      const ee = Array.isArray(entry) ? entry : [entry];

      ee.forEach(({ context, fn, once }) => {
        if (context === _context) {
          this.removeListener(event, fn, context, once);
        }
      });
    });
  }
}
