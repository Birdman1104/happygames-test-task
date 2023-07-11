import { LEVEL_TYPE } from "./configs/Const.js";
import { mapCommands } from "./configs/EventCommandPairs.js";
import { GlobalEvents, ViewEvents } from "./configs/events.js";
import { getGameViewGridConfig } from "./grid-config/GameViewGridConfig.js";
import { Grid } from "./grid/grid.js";
import { lego } from "./lego/index.js";
import { GameModelEvents } from "./models/GameModel.js";
import { fitDimension } from "./Utils.js";
import LevelView from "./views/LevelView.js";
import PreloadView from "./views/PreloadView.js";

class GameView extends Grid {
  #imageSlots;
  #imageOriginal;
  #levelConfig;
  constructor() {
    super();

    lego.event.on(GameModelEvents.LevelModelUpdate, this.#onLevelModelUpdate, this);
  }

  getGridConfig() {
    return getGameViewGridConfig();
  }

  rebuild() {
    super.rebuild(getGameViewGridConfig());
  }

  showGame() {
    this.#imageSlots = new LevelView(this.#levelConfig, LEVEL_TYPE.slots);
    this.attach("cell1", this.#imageSlots);

    this.#imageOriginal = new LevelView(this.#levelConfig, LEVEL_TYPE.original);
    this.#imageOriginal.y = this.#imageSlots.height;
    this.attach("cell2", this.#imageOriginal);
  }

  #onLevelModelUpdate(newLevel) {
    this.#levelConfig = newLevel;
  }
}

class PixiStage extends PIXI.Container {
  #uiView;
  #preloadView;
  #gameView;

  constructor() {
    super();
  }

  resize() {
    this.#gameView?.rebuild();
  }

  start() {
    this.#preloadView = new PreloadView();
    this.#preloadView.on(ViewEvents.PlayButtonClick, this.#onPlayButtonClick, this);
    this.addChild(this.#preloadView);
    this.#gameView = new GameView();
    this.#gameView.alpha = 0;
    this.addChild(this.#gameView);
  }

  #onPlayButtonClick() {
    this.#preloadView.destroy();
    this.#preloadView = null;

    this.#gameView.alpha = 1;
    this.#gameView.showGame();
  }
}

export class App extends PIXI.Application {
  #mainView;

  constructor() {
    super({
      backgroundColor: 0x343434,
      backgroundAlpha: 1,
      powerPreference: "high-performance",
      antialias: true,
      // resolution: Math.max(window.devicePixelRatio || 1, 2),
      resolution: 2,
      sharedTicker: true,
    });
  }

  async init() {
    this.stage = new PixiStage();

    this.view.classList.add("app");
    document.body.appendChild(this.view);
    // legoLogger.start(lego, Object.freeze({}));

    await this.loadAssets();
    this.onLoadComplete();
  }

  onFocusChange(value) {
    // lego.event.emit(WindowEvent.FocusChange, value);
  }

  onResize() {
    // const { innerWidth: w, innerHeight: h } = window;
    const { width: w, height: h } = fitDimension();

    this.resizeCanvas(w, h);
    this.resizeRenderer(w, h);

    console.warn(w, h);

    this.stage.resize();

    lego.event.emit(GlobalEvents.Resize);
  }

  async loadAssets() {
    const assets = [
      {
        name: "play_round_btn",
        path: "assets/play_round_btn.png",
      },
      {
        name: "frame",
        path: "assets/frame.png",
      },
      {
        name: "wrong_click",
        path: "assets/wrong_click.png",
      },
    ];
    for (const asset of assets) {
      const { name, path } = asset;
      PIXI.Assets.add(name, path);
      await PIXI.Assets.load(name);
    }
    // for (const atlas of atlases) {
    //   const { name, json } = atlas;
    //   PIXI.Assets.add(name, json);
    //   await PIXI.Assets.load(name);
    // }
  }

  onLoadComplete() {
    this.onResize();
    this.stage.start();

    lego.command.execute(mapCommands);
    lego.event.emit(GlobalEvents.MainViewReady);
  }

  resizeCanvas(width, height) {
    const { style } = this.renderer.view;

    style.width = `${width}px`;
    style.height = `${height}px`;
  }

  resizeRenderer(width, height) {
    this.renderer.resize(width, height);
  }
}
