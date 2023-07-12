import { ViewEvents } from "../configs/Events.js";
import { lego } from "../libs/lego/index.js";

class PopupView extends PIXI.Container {
  #bkg;
  #header;
  #button;
  constructor() {
    super();

    this.#build();
  }

  disable() {
    this.#button.eventMode = "none";
  }

  enable() {
    this.#button.eventMode = "static";
  }

  removeButton() {
    this.#button.destroy();
  }

  #build() {
    this.#buildBkg();
    this.#buildHeader();
    this.#buildButton();
  }

  #buildBkg() {
    this.#bkg = PIXI.Sprite.from("popup");
    this.#bkg.anchor.set(0.5);
    this.addChild(this.#bkg);
  }

  #buildHeader() {
    this.#header = new PIXI.Text("ПОБЕДА", {
      fontSize: 50,
      align: "center",
      fontFamily: "Filmotype Major",
    });
    this.#header.anchor.set(0.5);
    this.#header.x = this.#bkg.x;
    this.#header.y = -this.#bkg.height * 0.4;
    this.addChild(this.#header);
  }

  #buildButton() {
    this.#button = PIXI.Sprite.from("next_level");
    this.#button.anchor.set(0.5);
    this.#button.x = this.#bkg.x;
    this.#button.y = this.#bkg.height * 0.25;
    this.#button.eventMode = "static";
    this.#button.on("pointerdown", () => {
      lego.event.emit(ViewEvents.NextLevelClick);
    });
    this.addChild(this.#button);
  }
}

export default PopupView;
