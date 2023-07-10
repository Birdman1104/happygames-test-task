import pixiApp from "./PixiApp.js";

export const lp = (l, p) => {
  const { clientWidth: w, clientHeight: h } = document.body;
  return w > h ? l : p;
};

export const getGameBounds = () => {
  const { clientWidth: w, clientHeight: h } = document.body;
  return new PIXI.Rectangle(0, 0, w, h);
};

export const getCanvasBounds = () => {
  const canvas = document.getElementsByClassName("app")[0];
  const { width: w, height: h } = canvas;
  return new PIXI.Rectangle(0, 0, w, h);
};

export const fitDimension = () => {
  const aspect = 16 / 9;
  let { innerWidth: w, innerHeight: h } = window;
  if (w > h * aspect) {
    w = h * aspect;
  } else {
    h = (w * 1) / aspect;
  }
  return { width: w, height: h };
};

export const isSquareLikeScreen = () => {
  const { width, height } = getGameBounds();
  return Math.min(width, height) / Math.max(width, height) > 0.68;
};

export const isNarrowScreen = () => {
  const { width, height } = getGameBounds();
  return Math.min(width, height) / Math.max(width, height) < 0.5;
};

export const makeSprite = (config) => {
  const {
    texture,
    tint = 0,
    position = new PIXI.Point(0, 0),
    scale = new PIXI.Point(1, 1),
    anchor = new PIXI.Point(0.5, 0.5),
  } = config;

  const sprite = PIXI.Sprite.from(texture);

  sprite.scale.copyFrom(scale);
  sprite.anchor.copyFrom(anchor);
  sprite.position.copyFrom(position);

  if (tint) sprite.tint = tint;

  return sprite;
};

export const getDisplayObjectByProperty = (property, value, parent = null) => {
  const { children } = parent || pixiApp.pixiGame.stage;

  if (!children || children.length === 0) {
    return null;
  }

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child[property] === value) {
      return child;
    }
    if (child instanceof PIXI.Container) {
      const displayObject = getDisplayObjectByProperty(property, value, child);
      if (displayObject) {
        return displayObject;
      }
    }
  }

  return null;
};

export const delayRunnable = (delay, runnable, context, ...args) => {
  let delayMS = delay * 1000;
  const delayWrapper = () => {
    delayMS -= pixiApp.pixiGame.ticker.deltaMS;
    if (delayMS <= 0) {
      runnable.call(context, ...args);
      pixiApp.pixiGame.ticker.remove(delayWrapper);
    }
  };
  pixiApp.pixiGame.ticker.add(delayWrapper);
  return delayWrapper;
};

export const removeRunnable = (runnable) => {
  pixiApp.pixiGame.ticker.remove(runnable);
};

export const loopRunnable = (delay, runnable, context, ...args) => {
  let delayMS = delay * 1000;
  const delayWrapper = () => {
    delayMS -= pixiApp.pixiGame.ticker.deltaMS;
    if (delayMS <= 0) {
      runnable.call(context, ...args);
      delayMS = delay * 1000;
    }
  };
  pixiApp.pixiGame.ticker.add(delayWrapper);
  return delayWrapper;
};

export const postRunnable = (runnable, context = null, ...args) => {
  return delayRunnable(pixiApp.pixiGame.ticker.deltaMS / 1000, runnable, context, ...args);
};

export const getGr = (width = 10, height = 10, color = 0x919191, alpha = 1) => {
  const gr = new PIXI.Graphics();
  gr.eventMode = "static";
  gr.beginFill(color, alpha);
  gr.drawRect(0, 0, width, height);
  gr.endFill();
  return gr;
};
