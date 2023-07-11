import { getGameViewGridConfig } from "../grid-config/GameViewGridConfig.js";
import { Grid } from "../grid/grid.js";

class GameView extends Grid {
  #boardView;

  constructor() {
    super();
    this.#build();
  }

  getGridConfig() {
    return getGameViewGridConfig();
  }

  rebuild() {
    super.rebuild(this.getGridConfig());
  }

  resize() {
    //
  }

  #build() {
    // this.#boardView = new BoardView();
    // this.addChild(this.#boardView);
  }

  showGame() {
    // this.#boardView.showGame();
  }
}

export default GameView;
