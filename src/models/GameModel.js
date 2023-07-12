import { BASE_URL } from "../configs/Const.js";
import { ObservableModel } from "./ObservableModel.js";

export const GameModelEvents = {
  LevelModelUpdate: "GameModelLevelModelUpdate",
  LevelUpdate: "GameModelLevelUpdate",
  NextLevelImagesUpdate: "GameModelNextLevelImagesUpdate",
  NextLevelSlotsUpdate: "GameModelNextLevelSlotsUpdate",
  NextLevelModelUpdate: "GameModelNextLevelModelUpdate",
};

export class GameModel extends ObservableModel {
  #topLevel = 5; // THIS ONE IS HARDCODE !!!
  _level = 0;
  _levelModel;
  _nextLevelModel;
  _nextLevelSlots;
  _nextLevelImages;
  _isLastLevel = false;

  constructor() {
    super("GameModel");

    this.makeObservable();
  }

  get topLevel() {
    return this.#topLevel;
  }

  get nextLevelModel() {
    return this._nextLevelModel;
  }

  get nextLevelSlots() {
    return this._nextLevelSlots;
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

  get nextLevelImages() {
    return this._nextLevelImages;
  }

  set nextLevelImages(value) {
    this._nextLevelImages = value;
  }

  get isLastLevel() {
    return this._isLastLevel;
  }

  set isLastLevel(value) {
    this._isLastLevel = value;
  }

  initialize() {
    this._level = 1;
  }

  setNextLevel() {
    // if (this._isLastLevel) return;
    // this._level += 1;
    // this._isLastLevel = this._level === this.#topLevel;
    // const levelModel = new LevelModel(this._level, this._nextLevelSlots, []);
    // // levelModel.init(this._nextLevelSlots, []);
    // // levelModel.initSlotsAndLayer();
    // // levelModel.updateCounts();
    // this._levelModel = levelModel;
    // this.fetchNextLevelData();
  }

  async fetchDataForFirstLevel() {
    // const { slots, imagesToLoad } = await fetchDataForLevel(this._level);
    // this._levelModel = new LevelModel(this._level, slots, imagesToLoad);
    // level.init(slots, imagesToLoad);
    // level.initSlotsAndLayer();
    // level.updateCounts();
    // this._levelModel = level;
  }

  async fetchNextLevelData() {
    if (this.level >= 5) return;
    const { slots, imagesToLoad } = await fetchDataForLevel(this._level + 1);
    // this._nextLevelModel = new LevelModel(this._level, slots, imagesToLoad);
    this._nextLevelSlots = slots;
    this._nextLevelImages = imagesToLoad;
    console.warn("Fetched data for level", this._level + 1, this._nextLevelImages);
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
