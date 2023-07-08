import LayerView from "./LayerView.js";
import SlotView from "./SlutView.js";

class LevelView extends PIXI.Container {
  #layerConfig;
  #slotsConfig;
  #layer;
  #slots;
  constructor(config) {
    super();
    this.#layerConfig = config.layer;
    this.#slotsConfig = config.slots;
    this.#build();
  }

  #build() {
    this.#buildLayer();
    this.#buildSlots();
  }

  #buildLayer() {
    this.#layer = new LayerView(this.#layerConfig);
    this.addChild(this.#layer);
  }

  #buildSlots() {
    this.#slots = this.#slotsConfig.map((c) => {
      const slot = new SlotView(c);
      slot.x = c.x;
      slot.y = c.y;
      this.addChild(slot);
      return slot;
    });
    // this.#layer = new LayerView(this.#layerConfig);
    // this.addChild(this.#layer);
  }
}

export default LevelView;
