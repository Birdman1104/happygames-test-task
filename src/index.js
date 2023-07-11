import { App } from "./App.js";

window.addEventListener("load", async () => {
  window.game = new App();
  await window.game.init();

  window.addEventListener("resize", () => window.game.appResize());
  window.addEventListener("orientationchange", () => window.game.appResize());
  window.addEventListener("focus", () => window.game.onFocusChange(true));
  window.addEventListener("blur", () => window.game.onFocusChange(false));
});
