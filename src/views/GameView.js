import { LEVEL_TYPE } from "../configs/Const.js";
import { getGameViewGridConfig } from "../grid-config/GameViewGridConfig.js";
import { Grid } from "../grid/grid.js";
import { lego } from "../lego/index.js";
import { GameModelEvents } from "../models/GameModel.js";
import LevelView from "./LevelView.js";

class GameView extends Grid {
  #imageSlots;
  #imageOriginal;
  #levelConfig;
  constructor() {
    super();

    lego.event.on(GameModelEvents.LevelModelUpdate, this.#onLevelModelUpdate, this);
  }

  getGridConfig() {
    return getGameViewGridConfig();
  }

  rebuild() {
    super.rebuild(getGameViewGridConfig());
  }

  showGame() {
    this.#imageSlots = new LevelView(this.#levelConfig, LEVEL_TYPE.slots);
    this.attach("cell1", this.#imageSlots);

    this.#imageOriginal = new LevelView(this.#levelConfig, LEVEL_TYPE.original);
    this.#imageOriginal.y = this.#imageSlots.height;
    this.attach("cell2", this.#imageOriginal);
  }

  #onLevelModelUpdate(newLevel) {
    this.#levelConfig = newLevel;
  }
}

export default GameView;
