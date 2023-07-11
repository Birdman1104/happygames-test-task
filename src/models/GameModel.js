import { LevelModel } from "./LevelModel.js";
import { ObservableModel } from "./ObservableModel.js";

export const GameModelEvents = {
  LevelUpdate: "GameModelLevelUpdate",
};

export class GameModel extends ObservableModel {
  _level = -1; // number

  constructor() {
    super("GameModel");
    this.makeObservable();
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this._level = value;
  }

  async initialize() {
    const level = new LevelModel(1);
    await level.init();
    this._level = level;
  }
}
