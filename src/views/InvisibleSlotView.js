import { getGr } from "../Utils.js";
import { ViewEvents } from "../configs/Events.js";
import { lego } from "../libs/lego/index.js";

const SCALE = 0.1;
class InvisibleSlot extends PIXI.Container {
  #image;
  #config;
  #frame; // Nine Slice
  #isClicked = false;
  #uuid;
  constructor(config) {
    super();
    this.#config = config;
    this.#uuid = config.uuid;
    this.#build();
  }

  get uuid() {
    return this.#uuid;
  }

  showFrame() {
    this.#tweenFrame();
  }

  #build() {
    this.#buildImage();
    this.#buildFrame();
  }

  #buildImage() {
    const { width: w, height: h } = this.#config;
    this.#image = getGr(w, h, 0xff0000, 1);
    this.#image.eventMode = "dynamic";
    this.#image.once("pointerdown", () => {
      if (this.#isClicked) return;
      this.#isClicked = true;
      lego.event.emit(ViewEvents.SlotClick, this.#uuid);
    });
    this.#image.alpha = 0;
    this.addChild(this.#image);
  }

  #buildFrame() {
    const { height: h, width: w } = this.#config;
    this.#frame = new PIXI.NineSlicePlane(PIXI.Texture.from("frame"), 15, 15, 15, 15);
    this.#frame.alpha = 0;
    this.#frame.width = w;
    this.#frame.height = h;
    this.#frame.scale.set(SCALE);
    this.#frame.x = this.#image.width / 2 - (w / 2) * SCALE;
    this.#frame.y = this.#image.height / 2 - (h / 2) * SCALE;
    this.addChild(this.#frame);
  }

  #tweenFrame() {
    const { height: h, width: w } = this.#config;
    const ease = 0.1;
    const targetX = 1;
    const targetY = 1;
    const targetAlpha = 1;

    const animate = () => {
      const currentScale = this.#frame.scale.x;
      const dx = targetX - this.#frame.scale.x;
      const dy = targetY - this.#frame.scale.y;
      const da = targetAlpha - this.#frame.alpha;
      this.#frame.scale.x += dx * ease;
      this.#frame.scale.y += dy * ease;
      this.#frame.alpha += da * ease;
      this.#frame.x = this.#image.width / 2 - (w / 2) * currentScale;
      this.#frame.y = this.#image.height / 2 - (h / 2) * currentScale;

      if (dx < 0.01 && dy < 0.01) {
        this.#frame.x = this.#image.width / 2 - (w / 2) * currentScale;
        this.#frame.y = this.#image.height / 2 - (h / 2) * currentScale;
        this.#frame.scale.set(targetX, targetY);
        this.#frame.alpha = targetAlpha;
        window.game.ticker.remove(animate);
      }
    };
    window.game.ticker.add(animate);
  }
}

export default InvisibleSlot;
