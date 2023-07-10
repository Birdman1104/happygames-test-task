import { LEVEL_TYPE } from "../configs/Const.js";
import InvisibleSlot from "./InvisibleSlotView.js";
import LayerView from "./LayerView.js";

const SCALE = 0.2;

class LevelView extends PIXI.Container {
  #layerConfig;
  #slotsConfig;
  #layer;
  #slots;
  #type;
  constructor(config, type) {
    super();
    this.#layerConfig = config.layer;
    this.#type = type;
    this.#slotsConfig = this.#type === LEVEL_TYPE.slots ? config.slots : [];
    this.#build();
  }

  #build() {
    this.#buildLayer();
    this.#buildSlots();
  }

  #buildLayer() {
    const image = new LayerView(this.#layerConfig, this.#slotsConfig);
    image.cacheAsBitmap = true;
    this.#layer = new PIXI.Sprite(pixiApp.pixiGame.renderer.generateTexture(image));
    this.addChild(this.#layer);

    this.#layer.eventMode = "static";
    this.#layer.on("pointerdown", (e) => this.#onLayerClick(e.global));
  }

  #onLayerClick({ x, y }) {
    const mousePos = { x, y };
    this.#showWrongClick(mousePos);
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
        pixiApp.pixiGame.ticker.remove(animate);
      }
    };
    pixiApp.pixiGame.ticker.add(animate);
  }

  #getWrongClickImage(pos) {
    const image = PIXI.Sprite.from("wrong_click");
    const { width: w, height: h } = image;
    image.alpha = 0;
    image.scale.x = SCALE;
    image.scale.y = SCALE;
    image.x = pos.x - (w / 2) * SCALE;
    image.y = pos.y - (h / 2) * SCALE;
    return { image, width: w, height: h };
  }
}

export default LevelView;
