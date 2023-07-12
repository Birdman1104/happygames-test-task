import { BASE_URL } from "../configs/Const.js";
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
    const { slots, imagesToLoad } = await fetchDataForLevel(this._level);
    this._levelModel = new LevelModel(this._level, slots, imagesToLoad);
    this._levelModel.init(slots, imagesToLoad);
  }

  async #getDataForLevel(level) {
    return fetchDataForLevel(level);
  }
}

export const fetchDataForLevel = async (level) => {
  const levelDataLink = `${BASE_URL}${level}/level.json`;
  const response = await fetch(levelDataLink);
  const data = await response.json();
  const slots = data.slots;
  const imagesToLoad = slots.map(({ name }) => {
    return {
      name: `level${level}_${name}`,
      tag: name,
      path: `${BASE_URL}${level}/images/${name}.jpg`,
    };
  });

  return { slots, imagesToLoad };
};
