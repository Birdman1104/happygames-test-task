import { lp } from "../Utils.js";

export const getGameViewGridConfig = () => {
  return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
  const { width: w, height: h } = window.game.renderer.screen;
  return {
    area: { x: w * 0.25, y: h * 0.125, width: w * 0.5, height: h * 0.75 },
    debug: { color: 0xff0000 },
    cells: [
      {
        name: "cell1_l",
        bounds: { x: 0, y: 0, width: 1, height: 0.5 },
        // bounds: { x: 0.2, y: 0.5 * (1 - hr), width: 1 * wr, height: 0.5 * hr },
      },
      {
        name: "cell2_l",
        bounds: { x: 0, y: 0.5, width: 1, height: 0.5 },
        // bounds: { x: 0.2, y: 0.5, width: 1 * wr, height: 0.5 * hr },
      },
    ],
  };
};

const getGameViewGridPortraitConfig = () => {
  const { width: w, height: h } = window.game.renderer.screen;

  return {
    area: { x: w * 0.25, y: h * 0.125, width: w * 0.5, height: h * 0.75 },
    debug: { color: 0xff0000 },
    cells: [
      {
        name: "cell1_l",
        bounds: { x: 0, y: 0, width: 1, height: 0.5 },
        // bounds: { x: 0.2, y: 0.5 * (1 - hr), width: 1 * wr, height: 0.5 * hr },
      },
      {
        name: "cell2_l",
        bounds: { x: 0, y: 0.5, width: 1, height: 0.5 },
        // bounds: { x: 0.2, y: 0.5, width: 1 * wr, height: 0.5 * hr },
      },
    ],
  };
};
