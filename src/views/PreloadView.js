import { makeSprite } from "../Utils.js";
import { ViewEvents } from "../configs/Events.js";
import { getPreloadViewGridConfig } from "../grid-config/PreloadViewGridConfig.js";
import { Grid } from "../grid/grid.js";
import { lego } from "../lego/index.js";
import { LevelModelEvents } from "../models/LevelModel.js";

class PreloadView extends Grid {
  #playButton;
  constructor() {
    super();
    this.#build();

    lego.event.once(LevelModelEvents.ImagesToLoadUpdate, this.#imagesToLoadUpdate, this);
  }

  getGridConfig() {
    return getPreloadViewGridConfig();
  }

  rebuild() {
    super.rebuild(getPreloadViewGridConfig());
  }

  #build() {
    this.#playButton = makeSprite({ texture: "play_round_btn" });
    this.#playButton.eventMode = "static";
    this.#playButton.alpha = 0;
    this.attach("button", this.#playButton);
  }

  async #imagesToLoadUpdate(imagesToLoad) {
    console.warn("load start");
    await this.#loadImages(imagesToLoad);
    console.warn("load complete");

    this.#playButton.alpha = 1;
    // lego.event.emit(ViewEvents.PlayButtonClick));
    this.#playButton.on("pointerdown", () => lego.event.emit(ViewEvents.PlayButtonClick));
  }

  async #loadImages(imagesToLoad) {
    if (!imagesToLoad) return;
    for (const data of imagesToLoad) {
      const { name, path } = data;
      PIXI.Assets.add(name, path);
      await PIXI.Assets.load(name);
    }
  }
}

export default PreloadView;
