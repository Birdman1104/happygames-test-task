import { getUIViewGridConfig } from "../grid-config/UIViewGridConfig.js";
import { Grid } from "../grid/grid.js";
import { lego } from "../lego/index.js";
import { GameModelEvents } from "../models/GameModel.js";
import RightCounter from "./RightCounter.js";
import WrongClickCounter from "./WrongClicksCounter.js";

class UIView extends Grid {
  #header;
  #rightCounter;
  #wrongCounter;

  constructor() {
    super();

    lego.event.on(GameModelEvents.LevelUpdate, this.#onLevelUpdate, this);

    this.#build();
  }

  getGridConfig() {
    return getUIViewGridConfig();
  }

  rebuild() {
    super.rebuild(getUIViewGridConfig());
  }

  #onLevelUpdate(newLevel) {
    this.#header.text = `Уровень ${newLevel}`;
    this.#wrongCounter.updateCounter();
    this.rebuild();
  }

  #build() {
    this.#buildHeader();
    this.#buildRightCounter();
    this.#buildWrongCounter();
  }

  #buildHeader() {
    this.#header = new PIXI.Text("", {
      fontSize: 55,
      fontFamily: "Filmotype Major",
      align: "center",
    });
    this.attach("header", this.#header);
  }

  #buildRightCounter() {
    this.#rightCounter = new RightCounter();
    this.attach("counter_right", this.#rightCounter);
  }

  #buildWrongCounter() {
    this.#wrongCounter = new WrongClickCounter();
    this.attach("counter_wrong", this.#wrongCounter);
  }
}

export default UIView;
