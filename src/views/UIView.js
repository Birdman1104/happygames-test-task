import { getUIViewGridConfig } from "../grid-config/UIViewGridConfig.js";
import { Grid } from "../grid/grid.js";
import { lego } from "../lego/index.js";
import { GameModelEvents } from "../models/GameModel.js";
import { LevelModelEvents } from "../models/LevelModel.js";

class UIView extends Grid {
  #header;
  #rightCounter;
  #wrongCounter;
  #totalSlots; //number

  constructor() {
    super();

    lego.event.on(GameModelEvents.LevelUpdate, this.#onLevelUpdate, this);
    lego.event.on(LevelModelEvents.WrongClicksUpdate, this.#onWrongClicksUpdate, this);
    lego.event.on(LevelModelEvents.OpenedCountUpdate, this.#onOpenedCountUpdate, this);
    lego.event.on(LevelModelEvents.NotOpenedCountUpdate, this.#onNotOpenedCountUpdate, this);

    this.#build();
  }

  getGridConfig() {
    return getUIViewGridConfig();
  }

  rebuild() {
    super.rebuild(getUIViewGridConfig());
  }

  #onLevelUpdate(newLevel) {
    this.#header.text = `Level ${newLevel}`;
    this.rebuild();
  }

  #onWrongClicksUpdate(newCount) {
    this.#wrongCounter.text = `Ошибок։ ${newCount}`;
    this.rebuild();
  }

  #onOpenedCountUpdate(newCount) {
    this.#rightCounter.text = `Отличиий Найдено։ ${newCount}/${this.#totalSlots}`;
    this.rebuild();
  }

  #onNotOpenedCountUpdate(slotsCount) {
    this.#totalSlots = slotsCount;
    this.#rightCounter.text = `Отличиий Найдено։ 0/${this.#totalSlots}`;
  }

  #build() {
    this.#buildHeader();
    this.#buildRightCounter();
    this.#buildWrongCounter();
  }

  #buildHeader() {
    this.#header = new PIXI.Text("", {
      fontSize: 55,
      align: "center",
    });
    this.attach("header", this.#header);
  }

  #buildRightCounter() {
    this.#rightCounter = new PIXI.Text(``, {
      fontSize: 26,
      align: "center",
    });
    this.attach("counter_right", this.#rightCounter);
  }

  #buildWrongCounter() {
    this.#wrongCounter = new PIXI.Text("Ошибок։ 0", {
      fontSize: 26,
      align: "center",
    });
    this.attach("counter_wrong", this.#wrongCounter);
  }
}

export default UIView;
