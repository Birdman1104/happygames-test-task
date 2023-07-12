import { lego } from "../lego/index.js";
import { LevelModelEvents } from "../models/LevelModel.js";

class RightCounter extends PIXI.Container {
  #text;
  #score;
  #totalSlots;

  constructor() {
    super();

    lego.event.on(LevelModelEvents.OpenedCountUpdate, this.#onOpenedCountUpdate, this);
    lego.event.on(LevelModelEvents.NotOpenedCountUpdate, this.#onNotOpenedCountUpdate, this);

    this.#build();
  }

  #onOpenedCountUpdate(newCount) {
    this.#score.text = `${newCount}/${this.#totalSlots}`;
  }

  #onNotOpenedCountUpdate(slotsCount) {
    this.#totalSlots = slotsCount;
    this.#score.text = `0/${this.#totalSlots}`;
  }

  #build() {
    this.#buildText();
    this.#buildScore();
  }

  #buildText() {
    this.#text = new PIXI.Text(`Отличиий найдено`, {
      fontSize: 26,
      fontFamily: "Filmotype Major",
      align: "center",
    });
    this.addChild(this.#text);
  }

  #buildScore() {
    this.#score = new PIXI.Text("0/0 ", {
      fontSize: 26,
      fontFamily: "Filmotype Major",
      align: "center",
      fill: "0x00ff00",
    });
    this.#score.x = this.#text.width + 19;
    this.addChild(this.#score);
  }
}

export default RightCounter;
