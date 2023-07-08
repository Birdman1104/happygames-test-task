import GlobalEmitter from "../GlobalEmitter.js";
import { GameModelEvents } from "../models/GameModel.js";
import LevelView from "./LevelView.js";

class GameView extends PIXI.Container {
  #imageDifferent;
  #imageOriginal;
  #levelConfig;

  constructor() {
    super();
    this.#build();

    GlobalEmitter.on(GameModelEvents.LevelUpdate, this.#onLevelUpdate, this);
  }

  #build() {
    //
  }

  #onLevelUpdate(newLevel) {
    this.#levelConfig = newLevel;
  }

  showGame() {
    this.#imageDifferent = new LevelView(this.#levelConfig, 1);

    this.addChild(this.#imageDifferent);
  }
}

export default GameView;
