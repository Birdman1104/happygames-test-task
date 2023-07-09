import pixiApp from "../PixiApp.js";

const SCALE = 0.1;
class SlotView extends PIXI.Container {
  #image;
  #config;
  #frame; // Nine Slice
  #isFrameShown = false;
  constructor(config) {
    super();
    this.#config = config;
    this.#build();
  }

  #build() {
    this.#buildImage();
    this.#buildFrame();
  }

  #buildImage() {
    const { texture } = this.#config;
    this.#image = PIXI.Sprite.from(texture);
    this.#image.eventMode = "static";
    this.#image.on("pointerdown", () => {
      if (this.#isFrameShown) return;
      this.#isFrameShown = true;
      this.#tweenFrame();
    });
    this.addChild(this.#image);
  }

  #buildFrame() {
    const { height: h, width: w } = this.#config;
    this.#frame = new PIXI.NineSlicePlane(PIXI.Texture.from("frame"), 15, 15, 15, 15);
    this.#frame.alpha = 0;
    this.#frame.width = w;
    this.#frame.height = h;
    this.#frame.scale.x = SCALE;
    this.#frame.scale.y = SCALE;
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
        this.#frame.scale.x = targetX;
        this.#frame.scale.y = targetY;
        this.#frame.alpha = targetAlpha;
        pixiApp.pixiGame.ticker.remove(animate);
      }
    };
    pixiApp.pixiGame.ticker.add(animate);
  }
}

export default SlotView;
