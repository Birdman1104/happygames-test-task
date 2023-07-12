export const getForegroundViewGridConfig = () => {
  const { width: w, height: h } = window.game.renderer.screen;
  return {
    area: { x: w * 0.125, y: h * 0.125, width: w * 0.75, height: h * 0.75 },
    debug: { color: 0xff0000 },
    cells: [
      {
        name: "popup",
        bounds: { x: 0, y: 0, width: 1, height: 1 },
      },
    ],
  };
};
