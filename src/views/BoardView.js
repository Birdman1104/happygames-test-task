import { LEVEL_TYPE } from "../configs/Const.js";
import { lego } from "../lego/index.js";
import { GameModelEvents } from "../models/GameModel.js";
import LevelView from "./LevelView.js";

class BoardView extends PIXI.Container {
  #imageSlots;
  #imageOriginal;
  #levelConfig;

  constructor() {
    super();
    this.#build();

    lego.event.on(
      GameModelEvents.LevelModelUpdate,
      this.#onLevelModelUpdate,
      this
    );
  }

  resize() {
    //
  }

  #build() {
    //
  }

  #onLevelModelUpdate(newLevel) {
    this.#levelConfig = newLevel;
  }

  showGame() {
    this.#imageSlots = new LevelView(this.#levelConfig, LEVEL_TYPE.slots);
    // this.#imageSlots.scale = new PIXI.Point(0.5, 0.5);
    this.addChild(this.#imageSlots);

    this.#imageOriginal = new LevelView(this.#levelConfig, LEVEL_TYPE.original);
    this.#imageOriginal.y = this.#imageSlots.height;
    // this.#imageOriginal.scale = new PIXI.Point(0.5, 0.5);
    this.addChild(this.#imageOriginal);
  }
}

export default BoardView;
