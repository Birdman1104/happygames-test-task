import { App } from "./App.js";

window.addEventListener("load", async () => {
  window.game = new App();
  await window.game.init();

  window.addEventListener("resize", () => window.game.onResize());
  window.addEventListener("orientationchange", () => window.game.onResize());
  window.addEventListener("focus", () => window.game.onFocusChange(true));
  window.addEventListener("blur", () => window.game.onFocusChange(false));
});
