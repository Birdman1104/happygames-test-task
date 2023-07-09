import GlobalEmitter from "../GlobalEmitter.js";
import { LEVEL_TYPE } from "../configs/Const.js";
import { GameModelEvents } from "../models/GameModel.js";
import LevelView from "./LevelView.js";

class GameView extends PIXI.Container {
  #imageSlots;
  #imageOriginal;
  #levelConfig;

  constructor() {
    super();
    this.#build();

    GlobalEmitter.on(GameModelEvents.LevelUpdate, this.#onLevelUpdate, this);
  }

  resize() {
    //
  }

  #build() {
    //
  }

  #onLevelUpdate(newLevel) {
    this.#levelConfig = newLevel;
  }

  showGame() {
    this.#imageSlots = new LevelView(this.#levelConfig, LEVEL_TYPE.slots);
    this.addChild(this.#imageSlots);
    this.#imageOriginal = new LevelView(this.#levelConfig, LEVEL_TYPE.original);
    this.#imageOriginal.y = 300;
    this.addChild(this.#imageOriginal);
  }
}

export default GameView;
