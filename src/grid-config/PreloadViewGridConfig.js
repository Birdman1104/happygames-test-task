export const getPreloadViewGridConfig = () => {
  const { width: w, height: h } = window.game.renderer.screen;
  return {
    area: { x: w / 4, y: h / 4, width: w / 2, height: h / 2 },
    debug: { color: 0xff0000 },
    cells: [
      {
        name: "button",
        bounds: { x: 0, y: 0, width: 1, height: 1 },
      },
    ],
  };
};
