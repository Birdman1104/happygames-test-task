import PixiGame from "./PixiGame.js";

class PixiApp {
  #pixiGame;
  constructor() {
    //
  }

  get pixiGame() {
    return this.#pixiGame;
  }

  init() {
    this.#pixiGame = new PixiGame();
    this.#pixiGame.init();
  }

  onFocusChange() {
    // lego.event.emit(WindowEvent.FocusChange, value);
  }

  onResize() {
    const { clientWidth: width, clientHeight: height } = document.body;
    if (width === 0 || height === 0) return;
    this.#pixiGame.onResize({ width, height });
  }
}

const pixiApp = new PixiApp();

export default pixiApp;
