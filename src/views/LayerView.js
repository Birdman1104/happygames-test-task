class LayerView extends PIXI.Container {
  #imageConfig;
  #slotsConfig;
  constructor(imageConfig, slotsConfig) {
    super();
    this.#imageConfig = imageConfig;
    this.#slotsConfig = slotsConfig;
    this.#generateImage();
  }

  #generateImage() {
    const { texture } = this.#imageConfig;
    const image = PIXI.Sprite.from(texture);
    this.addChild(image);

    this.#slotsConfig.forEach(({ texture, x, y }) => {
      const slot = PIXI.Sprite.from(texture);
      slot.x = x;
      slot.y = y;
      this.addChild(slot);
    });
  }
}

export default LayerView;
