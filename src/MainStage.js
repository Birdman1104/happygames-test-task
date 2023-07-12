import ForegroundView from "./views/ForegroundView.js";
import GameView from "./views/GameView.js";
import UIView from "./views/UIView.js";

class PixiStage extends PIXI.Container {
  #gameView;
  #uiView;
  #foregroundView;

  constructor() {
    super();
  }

  resize() {
    this.#gameView?.rebuild();
    this.#uiView?.rebuild();
    this.#foregroundView?.rebuild();
  }

  start() {
    this.#gameView = new GameView();
    this.addChild(this.#gameView);

    this.#uiView = new UIView();
    this.addChild(this.#uiView);

    this.#foregroundView = new ForegroundView();
    this.addChild(this.#foregroundView);
  }
}

export default PixiStage;
