class ImageWithSlots extends PIXI.Container {
  constructor(imageConfig, slotsConfig) {
    super();

    const { texture } = imageConfig;
    const image = PIXI.Sprite.from(texture);
    this.addChild(image);

    slotsConfig.forEach(({ texture, x, y }) => {
      const slot = PIXI.Sprite.from(texture);
      slot.x = x;
      slot.y = y;
      this.addChild(slot);
    });
  }
}

export default ImageWithSlots;
