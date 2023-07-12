import { fetchDataForLevel } from "./GameModel.js";
import { ObservableModel } from "./ObservableModel.js";
import { SlotModel } from "./SlotModel.js";

export const LevelModelEvents = {
  WrongClicksUpdate: "LevelModelWrongClicksUpdate",
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
  _wrongClicks = 0;

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
  get wrongClicks() {
    return this._wrongClicks;
  }

  set wrongClicks(value) {
    this._wrongClicks = value;
  }

  init(slots, imagesToLoad) {
    this.slots = slots;
    this.imagesToLoad = imagesToLoad;
    this.#initSlotsAndLayer();
    this._totalSlots = this.slots.length;

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

  increaseWrongClick() {
    this.wrongClicks += 1;
  }

  #initSlotsAndLayer() {
    const tempArr = [];
    for (const d of this.slots) {
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
    const { slots, imagesToLoad } = await fetchDataForLevel(this._levelNumber);
    this._data = slots;
    this._imagesToLoad = imagesToLoad;
  }
}
