import { getGameBounds, makeSprite } from "../Utils.js";
import { ViewEvents } from "../configs/events.js";
import { lego } from "../lego/index.js";
import { LevelModelEvents } from "../models/LevelModel.js";

class PreloadView extends PIXI.Container {
  #playButton;
  constructor() {
    super();
    this.#build();

    lego.event.once(LevelModelEvents.ImagesToLoadUpdate, this.#imagesToLoadUpdate, this);
  }

  #build() {
    this.#playButton = makeSprite({ texture: "play_round_btn" });
    const { width, height } = getGameBounds();
    this.#playButton.x = width / 2;
    this.#playButton.y = height / 2;
    this.#playButton.eventMode = "static";
    this.#playButton.alpha = 0;
    this.addChild(this.#playButton);
  }

  async #imagesToLoadUpdate(imagesToLoad) {
    await this.#loadImages(imagesToLoad);

    this.#playButton.alpha = 1;
    this.emit(ViewEvents.PlayButtonClick);
    // this.#playButton.on("pointerdown", () => this.emit(ViewEvents.PlayButtonClick));
  }

  async #loadImages(imagesToLoad) {
    if (!imagesToLoad) return;
    for (const data of imagesToLoad) {
      const { name, path } = data;
      PIXI.Assets.add(name, path);
      await PIXI.Assets.load(name);
    }
  }

  // #onLayerUpdate(newValue, oldValue) {
  //   if (!newValue) return;
  //   this.#playButton.alpha = 1;
  //   this.#playButton.on("pointerdown", () => this.emit(ViewEvents.PlayButtonClick));
  // }
}

export default PreloadView;
