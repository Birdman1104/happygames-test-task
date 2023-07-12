import { CellScale } from "../grid/types.js";

export const getForegroundViewGridConfig = () => {
  const { width: w, height: h } = window.game.renderer.screen;
  return {
    area: { x: 0, y: 0, width: w, height: h },
    debug: { color: 0xff0000 },
    cells: [
      {
        name: "popup",
        bounds: { x: 0.125, y: 0.125, width: 0.75, height: 0.75 },
      },
      {
        name: "blocker",
        bounds: { x: 0, y: 0, width: 1, height: 1 },
        scale: CellScale.fill,
      },
    ],
  };
};
