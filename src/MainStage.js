import { ViewEvents } from "./configs/Events.js";
import { lego } from "./lego/index.js";
import ForegroundView from "./views/ForegroundView.js";
import GameView from "./views/GameView.js";
import PreloadView from "./views/PreloadView.js";
import UIView from "./views/UIView.js";

class PixiStage extends PIXI.Container {
  #preloadView;
  #gameView;
  #uiView;
  #foregroundView;

  constructor() {
    super();

    lego.event.on(ViewEvents.PlayButtonClick, this.#onPlayButtonClick, this);
  }

  resize() {
    this.#gameView?.rebuild();
    this.#preloadView?.rebuild();
    this.#uiView?.rebuild();
  }

  start() {
    this.#preloadView = new PreloadView();
    this.addChild(this.#preloadView);

    this.#gameView = new GameView();
    this.#gameView.alpha = 0;
    this.addChild(this.#gameView);

    this.#uiView = new UIView();
    this.#uiView.alpha = 0;
    this.addChild(this.#uiView);

    this.#foregroundView = new ForegroundView();
    this.addChild(this.#foregroundView);
  }

  #onPlayButtonClick() {
    this.#preloadView.destroy();

    this.#gameView.alpha = 1;
    this.#gameView.showGame();
    this.#uiView.alpha = 1;
  }
}

export default PixiStage;
