const SCALE = 0.2;
class LayerView extends PIXI.Container {
  #image;
  #config;
  constructor(config) {
    super();
    this.#config = config;
    this.#build();
  }

  #build() {
    const { texture } = this.#config;
    this.#image = PIXI.Sprite.from(texture);
    this.#image.eventMode = "static";
    this.#image.on("pointerdown", (e) => {
      this.#onImageClick(e.client);
    });
    this.addChild(this.#image);
  }

  #onImageClick({ x, y }) {
    const mousePos = { x, y };
    this.#showWrongClick(mousePos);
  }

  #showWrongClick(pos) {
    const ease = 0.1;
    const targetX = 1;
    const targetY = 1;
    const targetAlpha = 1;
    const { img, width: w, height: h } = this.#getWrongClickImage(pos);
    console.log(img, w, h);
    this.addChild(img);
    const loog = () => {
      const currentScale = img.scale.x;
      const dx = targetX - img.scale.x;
      const dy = targetY - img.scale.y;
      const da = targetAlpha - img.alpha;
      img.scale.x += dx * ease;
      img.scale.y += dy * ease;
      img.alpha += da * ease;
      img.x = pos.x - (w / 2) * currentScale;
      img.y = pos.y - (h / 2) * currentScale;

      if (dx < 0.01 && dy < 0.01) {
        img.x = img.width / 2 - (w / 2) * currentScale;
        img.y = img.height / 2 - (h / 2) * currentScale;
        img.scale.x = targetX;
        img.scale.y = targetY;
        img.alpha = targetAlpha;
        pixiApp.pixiGame.ticker.remove(loog);
      }
    };
    pixiApp.pixiGame.ticker.add(loog);
  }

  #getWrongClickImage(pos) {
    const img = PIXI.Sprite.from("wrong_click");
    const { width: w, height: h } = img;
    img.alpha = 0;
    img.scale.x = SCALE;
    img.scale.y = SCALE;
    img.x = pos.x - (w / 2) * SCALE;
    img.y = pos.y - (h / 2) * SCALE;
    return { img, width: w, height: h };
    // this.addChild(this.#frame);
  }
}

export default LayerView;
