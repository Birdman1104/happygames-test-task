import { LEVEL_TYPE } from "../configs/Const.js";
import { getGameViewGridConfig } from "../configs/grid-config/GameViewGridConfig.js";
import { Grid } from "../libs/grid/grid.js";
import { lego } from "../libs/lego/index.js";
import { GameModelEvents } from "../models/GameModel.js";
import LayerView from "./LayerView.js";

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

  #onLevelModelUpdate(newLevel) {
    this.#imageSlots?.destroy();
    this.#imageOriginal?.destroy();
    this.#levelConfig = newLevel;
    const { isLandscape } = this.#levelConfig;

    this.#imageSlots = new LayerView(this.#levelConfig, LEVEL_TYPE.slots);
    this.attach(`cell1_${isLandscape ? "l" : "p"}`, this.#imageSlots);

    this.#imageOriginal = new LayerView(this.#levelConfig, LEVEL_TYPE.original);
    this.attach(`cell2_${isLandscape ? "l" : "p"}`, this.#imageOriginal);
  }
}

export default GameView;
