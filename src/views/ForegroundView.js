import { getForegroundViewGridConfig } from "../grid-config/UIViewGridConfig.js";
import { Grid } from "../grid/grid.js";

class ForegroundView extends Grid {
  #popup;

  constructor() {
    super();

    this.#build();
  }

  getGridConfig() {
    return getForegroundViewGridConfig();
  }

  rebuild() {
    super.rebuild(getForegroundViewGridConfig());
  }

  #build() {
    // this.#buildHeader();
    // this.#buildRightCounter();
    // this.#buildWrongCounter();
  }
}

export default ForegroundView;
