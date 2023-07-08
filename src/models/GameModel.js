import GlobalEmitter from "../GlobalEmitter.js";
import { LevelModel } from "./LevelModel.js";
import ObservableModel from "./ObservableModel.js";

export const GameModelEvents = {
  LevelUpdate: "levelUpdate",
};

export class GameModel extends ObservableModel {
  #level; // number

  constructor() {
    super("GameModel");
  }

  get level() {
    return this.#level;
  }

  set level(value) {
    if (value === this.#level) return;
    GlobalEmitter.emit(GameModelEvents.LevelUpdate, value, this.#level, this.uuid);
    this.#level = value;
  }

  async initialize() {
    const level = new LevelModel(1);
    await level.init();
    this.level = level;
  }
}
