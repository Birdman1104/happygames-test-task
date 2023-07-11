import { ViewEvents } from "./configs/Events.js";
import GameView from "./views/GameView.js";
import PreloadView from "./views/PreloadView.js";
import UIView from "./views/UIView.js";

class PixiStage extends PIXI.Container {
  #uiView;
  #preloadView;
  #gameView;

  constructor() {
    super();
  }

  resize() {
    this.#gameView?.rebuild();
    this.#preloadView?.rebuild();
    this.#uiView?.rebuild();
  }

  start() {
    this.#preloadView = new PreloadView();
    this.#preloadView.on(ViewEvents.PlayButtonClick, this.#onPlayButtonClick, this);
    this.addChild(this.#preloadView);

    this.#gameView = new GameView();
    this.#gameView.alpha = 0;
    this.addChild(this.#gameView);

    this.#uiView = new UIView();
    this.#uiView.alpha = 0;
    this.addChild(this.#uiView);
  }

  #onPlayButtonClick() {
    this.#preloadView.destroy();
    this.#preloadView = null;

    this.#gameView.alpha = 1;
    this.#uiView.alpha = 1;
    this.#gameView.showGame();
  }
}

export default PixiStage;
