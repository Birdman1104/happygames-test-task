import { LEVEL_TYPE } from "../configs/Const.js";
import { lego } from "../lego/index.js";
import { SlotModelEvents } from "../models/SlotModel.js";
import ImageWithSlots from "./ImageWithSlots.js";
import InvisibleSlot from "./InvisibleSlotView.js";

const SCALE = 0.2;

class LevelView extends PIXI.Container {
  #imageConfig;
  #slotsConfig;
  #image;
  #slots;
  #type;
  constructor(config, type) {
    super();
    this.#imageConfig = config.layer;
    this.#type = type;
    this.#slotsConfig = config.slots;
    this.#build();
    lego.event.on(SlotModelEvents.OpenUpdate, this.#onSlotOpenUpdate, this);
  }

  #build() {
    this.#buildLayer();
    this.#buildSlots();
  }

  #buildLayer() {
    this.#type === LEVEL_TYPE.original ? this.#buildOriginalImage() : this.#buildImageWithSlots();

    this.#image.eventMode = "static";
    this.#image.on("pointerdown", (e) => this.#onImageClick(e.global, e));
    this.addChild(this.#image);
  }

  #buildOriginalImage() {
    const { texture } = this.#imageConfig;
    this.#image = PIXI.Sprite.from(texture);
  }

  #buildImageWithSlots() {
    const image = new ImageWithSlots(this.#imageConfig, this.#slotsConfig);
    image.cacheAsBitmap = true;
    this.#image = new PIXI.Sprite(window.game.renderer.generateTexture(image));
    image.destroy();
  }

  #onImageClick({ x, y }) {
    const localPos = this.toLocal({ x, y });
    this.#showWrongClick(localPos);
  }

  #buildSlots() {
    this.#slots = this.#slotsConfig.map((c) => {
      const slot = new InvisibleSlot(c);
      slot.x = c.x;
      slot.y = c.y;
      this.addChild(slot);
      return slot;
    });
  }

  #onSlotOpenUpdate(newValue, oldValue, uuid) {
    if (!newValue) return;
    const slot = this.#slots.find((s) => s.uuid === uuid);
    slot.showFrame();
  }

  #showWrongClick(pos) {
    const ease = 0.1;
    const targetX = 0.3;
    const targetY = 0.3;
    const targetAlpha = 1;
    const { image, width: w, height: h } = this.#getWrongClickImage(pos);
    this.addChild(image);
    const animate = () => {
      const currentScale = image.scale.x;
      const dx = targetX - image.scale.x;
      const dy = targetY - image.scale.y;
      const da = targetAlpha - image.alpha;
      image.scale.x += dx * ease;
      image.scale.y += dy * ease;
      image.alpha += da * ease;
      image.x = pos.x - (w / 2) * currentScale;
      image.y = pos.y - (h / 2) * currentScale;

      if (dx < 0.01 && dy < 0.01) {
        image.x = image.width / 2 - (w / 2) * currentScale;
        image.y = image.height / 2 - (h / 2) * currentScale;
        image.scale.x = targetX;
        image.scale.y = targetY;
        image.alpha = targetAlpha;
        image.destroy();
        window.game.ticker.remove(animate);
      }
    };
    window.game.ticker.add(animate);
  }

  #getWrongClickImage(pos) {
    const image = PIXI.Sprite.from("wrong_click");
    const { width: w, height: h } = image;
    image.alpha = 0;
    image.scale.x = SCALE;
    image.scale.y = SCALE;
    image.x = pos.x - (w / 2) * SCALE * this.#image.scale.x;
    image.y = pos.y - h / 2;
    return { image, width: w, height: h };
  }
}

export default LevelView;
