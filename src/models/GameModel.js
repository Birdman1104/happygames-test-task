import { LevelModel } from "./LevelModel.js";
import { ObservableModel } from "./ObservableModel.js";

export const GameModelEvents = {
  LevelModelUpdate: "GameModelLevelModelUpdate",
  LevelUpdate: "GameModelLevelUpdate",
};

export class GameModel extends ObservableModel {
  _level = 0;
  _levelModel; // number
  _nextLevelModel; // number

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

  get levelModel() {
    return this._levelModel;
  }

  set levelModel(value) {
    this._levelModel = value;
  }

  async initialize() {
    this._level = 1;
    const level = new LevelModel(this._level);
    await level.init();
    this._levelModel = level;

    this.#initNextLevel();
  }

  async #initNextLevel() {
    // const nextLevel = new LevelModel(this._level + 1);
    // await nextLevel.init();
    // this._nextLevelModel = nextLevel;
  }
}
