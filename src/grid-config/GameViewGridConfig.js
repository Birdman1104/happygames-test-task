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
      },
      {
        name: "cell2_l",
        bounds: { x: 0, y: 0.5, width: 1, height: 0.5 },
      },
      {
        name: "cell1_p",
        bounds: { x: 0, y: 0, width: 0.5, height: 1 },
      },
      {
        name: "cell2_p",
        bounds: { x: 0.5, y: 0, width: 0.5, height: 1 },
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
      },
      {
        name: "cell2_l",
        bounds: { x: 0, y: 0.5, width: 1, height: 0.5 },
      },
      {
        name: "cell1_p",
        bounds: { x: 0, y: 0, width: 0.5, height: 1 },
      },
      {
        name: "cell2_p",
        bounds: { x: 0.5, y: 0, width: 0.5, height: 1 },
      },
    ],
  };
};
