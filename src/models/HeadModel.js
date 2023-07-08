import { GameModel } from "./GameModel.js";
import ObservableModel from "./ObservableModel.js";

export const HeadModelEvents = {
  GameModelUpdate: "gameModelUpdate",
};
class HeadModel extends ObservableModel {
  #gameModel;

  constructor() {
    super("HeadModel");
  }

  get gameModel() {
    return this.#gameModel;
  }

  set gameModel(value) {
    if (value === this.#gameModel) return;
    GlobalEmitter.emit(HeadModelEvents.GameModelUpdate, value, this.#gameModel, this.uuid);
    this.#gameModel = value;
  }

  initialize() {
    this.#gameModel = new GameModel();
    this.#gameModel.initialize();
  }
}

export const Head = new HeadModel();
