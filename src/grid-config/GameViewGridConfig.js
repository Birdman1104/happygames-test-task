import { lp } from "../Utils.js";

export const getGameViewGridConfig = () => {
  return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(
    null
  );
};

const getGameViewGridLandscapeConfig = () => {
  const { width: w, height: h } = window.game.renderer.screen;

  return {
    area: { x: 0, y: 0, width: w, height: h },
    debug: { color: 0xff0000 },
    cells: [
      {
        name: "board",
        bounds: { x: 0, y: 0, width: 1, height: 1 },
      },
      {
        name: "cell1",
        bounds: { x: 0, y: 0, width: 1, height: 0.5 },
      },
      {
        name: "cell2",
        bounds: { x: 0, y: 0.5, width: 1, height: 0.5 },
      },
    ],
  };
};

const getGameViewGridPortraitConfig = () => {
  const { width: w, height: h } = window.game.renderer.screen;

  return {
    debug: { color: 0xff0000 },
    area: { x: 0, y: 0, width: w, height: h },
    cells: [
      {
        name: "cell1",
        bounds: { x: 0, y: 0, width: 1, height: 0.5 },
      },
      {
        name: "cell2",
        bounds: { x: 0, y: 0.5, width: 1, height: 0.5 },
      },
      {
        name: "board",
        bounds: { x: 0, y: 0, width: 1, height: 1 },
      },
    ],
  };
};
