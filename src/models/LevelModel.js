import GlobalEmitter from "../GlobalEmitter.js";
import { BASE_URL } from "../configs/Const.js";
import ObservableModel from "./ObservableModel.js";
import { SlotModel } from "./SlotModel.js";

export const LevelModelEvents = {
  SlotsUpdate: "SlotsUpdate",
  LayerUpdate: "LayerUpdate",
  ImagesToLoadUpdate: "ImagesToLoadUpdate",
};

export class LevelModel extends ObservableModel {
  #levelNumber; // number
  #layer; // SlotModel
  #slots; // SlotModel[]
  #data; // all the fetched data
  #imagesToLoad; // links to all the images that must be loaded

  constructor(levelNumber) {
    super("LevelModel");

    this.#levelNumber = levelNumber;
  }

  get levelNumber() {
    return this.#levelNumber;
  }

  get slots() {
    return this.#slots;
  }

  set slots(value) {
    // it is data, it always comes in the same way, that's why I used JSON.stringify().
    // If the case was different, I would use _.isEqual() from lodash
    if (JSON.stringify(value) == JSON.stringify(this.#slots)) return;
    GlobalEmitter.emit(LevelModelEvents.SlotsUpdate, value, this.#slots, this.uuid);
    this.#slots = value;
  }

  get layer() {
    return this.#layer;
  }

  set layer(value) {
    if (JSON.stringify(value) == JSON.stringify(this.#layer)) return;
    GlobalEmitter.emit(LevelModelEvents.LayerUpdate, value, this.#layer, this.uuid);
    this.#layer = value;
  }

  get imagesToLoad() {
    return this.#imagesToLoad;
  }

  set imagesToLoad(value) {
    if (JSON.stringify(value) == JSON.stringify(this.#imagesToLoad)) return;
    GlobalEmitter.emit(LevelModelEvents.ImagesToLoadUpdate, value, this.#imagesToLoad, this.uuid);
    this.#imagesToLoad = value;
  }

  async init() {
    await this.#fetchSlotsData();
    this.#initSlotsAndLayer();
    this.#getImagesData();
  }

  #initSlotsAndLayer() {
    const tempArr = [];
    for (const d of this.#data) {
      const texture = `level${this.#levelNumber}_${d.name}`;
      if (d.layer === "standart") {
        this.layer = new SlotModel(d, texture);
      } else {
        tempArr.push(new SlotModel(d, texture));
      }
    }
    this.slots = tempArr;
  }

  async #fetchSlotsData() {
    // const levelDataLink = `${BASE_URL}/${4}/level.json`;
    const levelDataLink = `${BASE_URL}${this.#levelNumber}/level.json`;
    const response = await fetch(levelDataLink);
    const data = await response.json();
    this.#data = data.slots;
  }

  #getImagesData() {
    this.imagesToLoad = this.#data.map(({ name }) => {
      return {
        name: `level${this.#levelNumber}_${name}`,
        tag: name,
        path: `${BASE_URL}${this.#levelNumber}/images/${name}.jpg`,
      };
    });
  }
}
