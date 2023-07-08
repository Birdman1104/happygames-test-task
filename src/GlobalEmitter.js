import { eventCommandPairs } from "./configs/EventCommandPairs.js";

class ExtendedEmitter extends PIXI.utils.EventEmitter {
  mapCommands() {
    eventCommandPairs.forEach(({ event, command }) => {
      this.on(event, command);
    });
  }
  unMapCommands() {
    eventCommandPairs.forEach(({ event, command }) => {
      this.off(event, command);
    });
  }
}

const GlobalEmitter = new ExtendedEmitter();

export default GlobalEmitter;
