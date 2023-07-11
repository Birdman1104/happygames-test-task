import { ViewEvents } from "./configs/events.js";
import GameView from "./views/GameView.js";
import PreloadView from "./views/PreloadView.js";

class PixiStage extends PIXI.Container {
  #uiView;
  #preloadView;
  #gameView;

  constructor() {
    super();
  }

  resize() {
    this.#gameView?.rebuild();
  }

  start() {
    this.#preloadView = new PreloadView();
    this.#preloadView.on(ViewEvents.PlayButtonClick, this.#onPlayButtonClick, this);
    this.addChild(this.#preloadView);

    this.#gameView = new GameView();
    this.#gameView.alpha = 0;
    this.addChild(this.#gameView);
  }

  #onPlayButtonClick() {
    this.#preloadView.destroy();
    this.#preloadView = null;

    this.#gameView.alpha = 1;
    this.#gameView.showGame();
  }
}

export default PixiStage;
