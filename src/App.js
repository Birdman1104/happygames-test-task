import { mapCommands } from "./configs/EventCommandPairs.js";
import { GlobalEvents } from "./configs/events.js";
import { lego } from "./lego/index.js";
import PixiStage from "./MainStage.js";
import { fitDimension } from "./Utils.js";

export class App extends PIXI.Application {
  constructor() {
    super({
      backgroundColor: 0x343434,
      backgroundAlpha: 1,
      powerPreference: "high-performance",
      antialias: true,
      resolution: Math.max(window.devicePixelRatio || 1, 2),
      // resolution: 2,
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

  appResize() {
    const { width: w, height: h } = fitDimension();

    this.resizeCanvas(w, h);
    this.resizeRenderer(w, h);

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
    this.appResize();
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
