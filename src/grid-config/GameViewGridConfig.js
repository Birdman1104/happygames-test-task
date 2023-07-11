import { lp } from "../Utils.js";

export const getGameViewGridConfig = () => {
  return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
  return {
    name: "game",
    bounds: { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight },
    area: { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight },
    debug: { color: 0x0000ff },
    cells: [
      {
        name: "board",
        bounds: { x: 0, y: 0, width: 1, height: 1 },
      },
    ],
  };
};

const getGameViewGridPortraitConfig = () => {
  return {
    name: "game",
    debug: { color: 0x0000ff },
    bounds: { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight },
    area: { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight },
    cells: [
      {
        name: "board",
        bounds: { x: 0, y: 0, width: 1, height: 1 },
      },
    ],
  };
};
