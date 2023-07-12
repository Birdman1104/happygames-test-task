import { LEVEL_TYPE } from "../configs/Const.js";
import { ViewEvents } from "../configs/Events.js";
import { getGameViewGridConfig } from "../grid-config/GameViewGridConfig.js";
import { Grid } from "../grid/grid.js";
import { lego } from "../lego/index.js";
import { GameModelEvents } from "../models/GameModel.js";
import { LevelModelEvents } from "../models/LevelModel.js";
import LayerView from "./LayerView.js";

class GameView extends Grid {
  #imageSlots;
  #imageOriginal;
  #levelConfig;
  #isLoading = false;
  constructor() {
    super();

    lego.event.on(GameModelEvents.LevelModelUpdate, this.#onLevelModelUpdate, this);
    lego.event.on(GameModelEvents.NextLevelImagesUpdate, this.#onNextLevelImagesUpdate, this);
    lego.event.on(LevelModelEvents.CompleteUpdate, this.#onLevelCompleteUpdate, this);
  }

  getGridConfig() {
    return getGameViewGridConfig();
  }

  rebuild() {
    super.rebuild(getGameViewGridConfig());
  }

  showGame() {
    return;
    const { isLandscape } = this.#levelConfig;
    this.#imageSlots = new LayerView(this.#levelConfig, LEVEL_TYPE.slots);
    console.warn(this.#levelConfig);
    this.attach(`cell1_${isLandscape ? "l" : "p"}`, this.#imageSlots);
    this.#imageOriginal = new LayerView(this.#levelConfig, LEVEL_TYPE.original);
    this.attach(`cell2_${isLandscape ? "l" : "p"}`, this.#imageOriginal);
  }

  #onLevelModelUpdate(newLevel) {
    this.#levelConfig = newLevel;
    console.warn(this.#levelConfig.slots);

    // if (this.#imageOriginal) return;
    // const { isLandscape } = this.#levelConfig;
    this.#imageSlots = new LayerView(this.#levelConfig, LEVEL_TYPE.slots);
    // this.attach(`cell1_${isLandscape ? "l" : "p"}`, this.#imageSlots);
    // this.#imageOriginal = new LayerView(this.#levelConfig, LEVEL_TYPE.original);
    // this.attach(`cell2_${isLandscape ? "l" : "p"}`, this.#imageOriginal);
  }

  #onLevelCompleteUpdate() {
    setTimeout(() => {
      this.#imageOriginal.destroy();
      this.#imageSlots.destroy();
    }, 500);
  }

  async #onNextLevelImagesUpdate(imagesToLoad) {
    if (!imagesToLoad) return;
    this.#isLoading = true;
    lego.event.emit(ViewEvents.NextLevelAssetLoadingStart);
    console.warn("next level asset load start");
    for (const data of imagesToLoad) {
      const { name, path } = data;
      PIXI.Assets.add(name, path);
      await PIXI.Assets.load(name);
    }
    console.warn("next level asset load complete");
    lego.event.emit(ViewEvents.NextLevelAssetLoadingComplete);
    this.#isLoading = false;
  }
}

export default GameView;
