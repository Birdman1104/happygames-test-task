import { lego } from "../lego/index.js";
import { LevelModelEvents } from "../models/LevelModel.js";

class WrongClickCounter extends PIXI.Container {
  #text;
  #counter;

  constructor() {
    super();

    lego.event.on(LevelModelEvents.WrongClicksUpdate, this.#onWrongClicksUpdate, this);

    this.#build();
  }

  updateCounter() {
    this.#counter.text = "0";
  }
  #onWrongClicksUpdate(newCount) {
    this.#counter.text = `${newCount}`;
  }

  #build() {
    this.#buildText();
    this.#buildCounter();
  }

  #buildText() {
    this.#text = new PIXI.Text("Ошибок", {
      fontSize: 26,
      fontFamily: "Filmotype Major",
      align: "center",
    });
    this.addChild(this.#text);
  }

  #buildCounter() {
    this.#counter = new PIXI.Text("0", {
      fontSize: 26,
      fontFamily: "Filmotype Major",
      align: "center",
      fill: 0xaa0000,
    });
    this.#counter.x = this.#text.width + 20;
    this.addChild(this.#counter);
  }
}

export default WrongClickCounter;
