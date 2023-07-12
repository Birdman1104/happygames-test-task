import { CellAlign } from "../grid/types.js";

export const getUIViewGridConfig = () => {
  const { width: w, height: h } = window.game.renderer.screen;
  return {
    area: { x: 0, y: 0, width: w, height: h },
    debug: { color: 0x00ff00 },
    cells: [
      {
        name: "header",
        bounds: { x: 0, y: 0, width: 1, height: 0.125 },
      },
      {
        name: "counter_right",
        bounds: { x: 0.75, y: 0.75, width: 0.25, height: 0.125 },
        align: CellAlign.leftCenter,
      },
      {
        name: "counter_wrong",
        bounds: { x: 0.75, y: 0.875, width: 0.25, height: 0.125 },
        align: CellAlign.leftCenter,
      },
    ],
  };
};
