import { ViewEvents } from "../configs/events.js";
import GameView from "./GameView.js";
import PreloadView from "./PreloadView.js";

class MainView extends PIXI.Container {
  #preloadView;
  #gameView;
  constructor() {
    super();
    this.#build();
  }

  #build() {
    this.#buildPreloadView();
    this.#buildGameView();
  }

  #buildPreloadView() {
    this.#preloadView = new PreloadView();
    this.#preloadView.on(ViewEvents.PlayButtonClick, this.#onPlayButtonClick, this);
    this.addChild(this.#preloadView);
  }

  #buildGameView() {
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

export default MainView;
