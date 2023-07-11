import { Command } from "./command.js";
import { Emitter } from "./emitter.js";
import { Observe } from "./observe.js";

export class Lego {
  constructor() {
    this.event = new Emitter(this);
    this.command = new Command(this);
    this.observe = new Observe(this);
  }

  not(fn) {
    return (...args) => !fn(...args);
  }
}
