import pixiApp from "./PixiApp.js";

window.pixiApp = pixiApp;
window.addEventListener("load", () => {
  pixiApp.init();
});

window.addEventListener("resize", () => pixiApp.onResize());
window.addEventListener("orientationchange", () => pixiApp.onResize());
window.addEventListener("focus", () => pixiApp.onFocusChange(true));
window.addEventListener("blur", () => pixiApp.onFocusChange(false));
