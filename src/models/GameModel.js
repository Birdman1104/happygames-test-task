import { LevelModel } from "./LevelModel.js";
import { ObservableModel } from "./ObservableModel.js";

export const GameModelEvents = {
  LevelModelUpdate: "GameModelLevelModelUpdate",
  LevelUpdate: "GameModelLevelModelUpdate",
};

export class GameModel extends ObservableModel {
  #level = 0;
  _levelModel; // number
  _nextLevelModel; // number

  constructor() {
    super("GameModel");
    this.#level = 1;
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
    const level = new LevelModel(this.#level);
    await level.init();
    this._levelModel = level;

    this.#initNextLevel();
  }

  async #initNextLevel() {
    const nextLevel = new LevelModel(this.#level + 1);
    await nextLevel.init();
    this._nextLevelModel = nextLevel;
  }
}
