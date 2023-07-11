import { LevelModel } from "./LevelModel.js";
import { ObservableModel } from "./ObservableModel.js";

export const GameModelEvents = {
  LevelModelUpdate: "GameModelLevelModelUpdate",
  LevelUpdate: "GameModelLevelModelUpdate",
};

export class GameModel extends ObservableModel {
  _levelModel; // number

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
    const level = new LevelModel(1);
    await level.init();
    this._levelModel = level;
  }
}
