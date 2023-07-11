import { BASE_URL } from "../configs/Const.js";
import { ObservableModel } from "./ObservableModel.js";
import { SlotModel } from "./SlotModel.js";

export const LevelModelEvents = {
  SlotsUpdate: "LevelModelSlotsUpdate",
  DataUpdate: "LevelModelDataUpdate",
  LayerUpdate: "LevelModelLayerUpdate",
  ImagesToLoadUpdate: "LevelModelImagesToLoadUpdate",
  IsLandscapeUpdate: "LevelModelIsLandscapeUpdate",
  OpenedCountUpdate: "LevelModelOpenedSlotsCountUpdate",
  NotOpenedCountUpdate: "LevelModelTotalSlotsUpdate",
};

export class LevelModel extends ObservableModel {
  _levelNumber; // number
  _layer; // SlotModel
  _slots; // SlotModel[]
  _data; // all the fetched data
  _imagesToLoad; // links to all the images that must be loaded
  _isLandscape = false;
  _openedSlotsCount = -1;
  _totalSlots = -1;

  constructor(levelNumber) {
    super("LevelModel");

    this._levelNumber = levelNumber;
    this.makeObservable();
  }

  get isLandscape() {
    return this._isLandscape;
  }

  get levelNumber() {
    return this._levelNumber;
  }

  get slots() {
    return this._slots;
  }

  set slots(value) {
    this._slots = value;
  }

  get layer() {
    return this._layer;
  }

  set layer(value) {
    this._layer = value;
  }

  get imagesToLoad() {
    return this._imagesToLoad;
  }

  set imagesToLoad(value) {
    this._imagesToLoad = value;
  }

  get openedSlotsCount() {
    return this._openedSlotsCount;
  }

  set openedSlotsCount(value) {
    this._openedSlotsCount = value;
  }

  get totalSlots() {
    return this._totalSlots;
  }

  set totalSlots(value) {
    this._totalSlots = value;
  }

  async init() {
    await this.#fetchSlotsData();
    this.#initSlotsAndLayer();
    this._totalSlots = this.slots.length;
    this.#getImagesData();

    this.updateCounts();
  }

  updateCounts() {
    this._openedSlotsCount = this.slots.filter((s) => s.isOpened).length;
  }

  getSlotByUuid(uuid) {
    return this.slots.find((s) => s.uuid === uuid);
  }

  openSlot(uuid) {
    const slot = this.getSlotByUuid(uuid);
    slot.isOpened = true;
  }

  #initSlotsAndLayer() {
    const tempArr = [];
    for (const d of this._data) {
      const texture = `level${this._levelNumber}_${d.name}`;
      if (d.name === "layer_0") {
        this.layer = new SlotModel(d, texture);
        this._isLandscape = d.width > d.height;
      } else {
        tempArr.push(new SlotModel(d, texture));
      }
    }
    this.slots = tempArr;
  }

  async #fetchSlotsData() {
    // const levelDataLink = `${BASE_URL}/${4}/level.json`;
    const levelDataLink = `${BASE_URL}${this._levelNumber}/level.json`;
    const response = await fetch(levelDataLink);
    const data = await response.json();
    this._data = data.slots;
  }

  #getImagesData() {
    this.imagesToLoad = this._data.map(({ name }) => {
      return {
        name: `level${this._levelNumber}_${name}`,
        tag: name,
        path: `${BASE_URL}${this._levelNumber}/images/${name}.jpg`,
      };
    });
  }
}
