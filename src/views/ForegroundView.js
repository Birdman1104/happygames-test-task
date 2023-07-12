import { getGr } from "../Utils.js";
import { getForegroundViewGridConfig } from "../grid-config/ForegroundGridConfig.js";
import { Grid } from "../grid/grid.js";
import { lego } from "../lego/index.js";
import { GameModelEvents } from "../models/GameModel.js";
import { LevelModelEvents } from "../models/LevelModel.js";
import PopupView from "./PopupView.js";

class ForegroundView extends Grid {
  #popup;
  #blocker;
  #gameLevel;

  constructor() {
    super();

    lego.event.on(LevelModelEvents.CompleteUpdate, this.#onLevelCompleteUpdate, this);
    lego.event.on(GameModelEvents.LevelUpdate, this.#onLevelUpdate, this);

    this.#build();
  }

  getGridConfig() {
    return getForegroundViewGridConfig();
  }

  rebuild() {
    super.rebuild(getForegroundViewGridConfig());
  }

  showPopup() {
    this.#blocker.alpha = 1;
    this.#blocker.eventMode = "static";
    this.#gameLevel < 5 ? this.#popup.enable() : this.#popup.removeButton();
    this.#popup.alpha = 1;
  }

  hidePopup() {
    this.#blocker.alpha = 0;
    this.#blocker.eventMode = "none";
    this.#popup.disable();
    this.#popup.alpha = 0;
  }

  #onLevelCompleteUpdate(isComplete) {
    setTimeout(() => {
      isComplete ? this.showPopup() : this.hidePopup();
    }, 500);
  }

  #onLevelUpdate(level) {
    this.#gameLevel = level;
    this.hidePopup();
  }

  #build() {
    this.#buildBlocker();
    this.#buildPopup();
    this.hidePopup();
  }

  #buildPopup() {
    this.#popup = new PopupView();
    this.attach("popup", this.#popup);
  }

  #buildBlocker() {
    this.#blocker = getGr(10, 10, 0x000000, 0.5);
    this.attach("blocker", this.#blocker);
  }
}

export default ForegroundView;
