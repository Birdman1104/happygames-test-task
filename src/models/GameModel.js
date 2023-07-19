import { BASE_URL } from "../configs/Const.js";
import { LevelModel } from "./LevelModel.js";
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
    //
  }

  async setNextLevel() {
    this._level += 1;
    if (this.level > 5) this.level = 1;
    this._levelModel = new LevelModel(this._level, this._nextLevelSlots);
    await this.fetchNextLevelData();
  }

  async fetchDataForNexLevel() {
    const { slots, imagesToLoad } = await fetchDataForLevel(this._level + 1);
    this.nextLevelImages = imagesToLoad;
    // HARDCODE need to find a better way to load assets
    await window.game.loadAssets(imagesToLoad);
    this.level += 1;
    this._levelModel = new LevelModel(this._level, slots);
    await this.fetchNextLevelData();
  }

  async fetchNextLevelData() {
    if (this.level > 5) this.level = 1;
    const { slots, imagesToLoad } = await fetchDataForLevel(this._level + 1);
    this._nextLevelSlots = slots;
    this._nextLevelImages = imagesToLoad;
    await window.game.loadAssets(imagesToLoad);
  }
}

export const fetchDataForLevel = async (level) => {
  level = level > 5 ? 1 : level;
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
