import { GlobalEvents } from "./configs/events.js";
import GlobalEmitter from "./GlobalEmitter.js";
import { fitDimension } from "./Utils.js";
import MainView from "./views/MainView.js";

class PixiGame extends PIXI.Application {
  #mainView;
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000033,
      backgroundAlpha: 1,
      powerPreference: "high-performance",
      antialias: true,
      resolution: 1,
      sharedTicker: true,
    });
  }

  async init() {
    this.view.classList.add("app");
    document.body.appendChild(this.view);

    await this.loadAssets();
    this.onLoadComplete();
  }

  onResize() {
    const { width, height } = fitDimension();

    this.resizeCanvas(width, height);
    this.resizeRenderer(width, height);

    GlobalEmitter.emit(GlobalEvents.Resize);
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
    GlobalEmitter.mapCommands();
    this.#mainView = new MainView();
    this.stage.addChild(this.#mainView);
    GlobalEmitter.emit(GlobalEvents.MainViewReady);
  }

  resizeCanvas(width, height) {
    const { style } = this.renderer.view;
    if (!style) return;
    style.width = `${width}px`;
    style.height = `${height}px`;
  }

  resizeRenderer(width, height) {
    this.renderer.resize(width, height);
  }
}

export default PixiGame;
