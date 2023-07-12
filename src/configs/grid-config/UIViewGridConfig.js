import { CellAlign } from "../../libs/grid/types.js";

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
        bounds: { x: 0.75, y: 0.8, width: 0.225, height: 0.09 },
        align: CellAlign.rightCenter,
      },
      {
        name: "counter_wrong",
        bounds: { x: 0.875, y: 0.88, width: 0.1, height: 0.1 },
        align: CellAlign.rightCenter,
      },
    ],
  };
};
