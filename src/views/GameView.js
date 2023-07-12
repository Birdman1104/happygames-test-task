import { LEVEL_TYPE } from "../configs/Const.js";
import { getGameViewGridConfig } from "../grid-config/GameViewGridConfig.js";
import { Grid } from "../grid/grid.js";
import { lego } from "../lego/index.js";
import { GameModelEvents } from "../models/GameModel.js";
import LayerView from "./LayerView.js";

class GameView extends Grid {
  #imageSlots;
  #imageOriginal;
  #levelConfig;
  constructor() {
    super();

    lego.event.on(GameModelEvents.LevelModelUpdate, this.#onLevelModelUpdate, this);
    lego.event.on(GameModelEvents.NextLevelImagesUpdate, this.#onNextLevelImagesUpdate, this);
  }

  getGridConfig() {
    return getGameViewGridConfig();
  }

  rebuild() {
    super.rebuild(getGameViewGridConfig());
  }

  showGame() {
    return;
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

  setViews() {
    if (this.#imageSlots) return;
  }
}

export default GameView;
