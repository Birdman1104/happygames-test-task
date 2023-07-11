import { GameModel } from "./GameModel.js";
import { ObservableModel } from "./ObservableModel.js";

export const HeadModelEvents = {
  GameModelUpdate: "HeadModelGameModelUpdate",
};
class HeadModel extends ObservableModel {
  _gameModel;

  constructor() {
    super("HeadModel");
    this.makeObservable();
  }

  get gameModel() {
    return this._gameModel;
  }

  set gameModel(value) {
    this._gameModel = value;
  }

  initialize() {
    this._gameModel = new GameModel();
    this._gameModel.initialize();
  }
}

export const Head = new HeadModel();
