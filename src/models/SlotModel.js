import ObservableModel from "./ObservableModel.js";

export class SlotModel extends ObservableModel {
  #sourceCenterX;
  #sourceCenterY;
  #sourceHeight;
  #sourceWidth;
  #sourceX;
  #sourceY;
  #height;
  #layer;
  #name;
  #width;
  #x;
  #y;
  #texture;

  constructor(data, texture) {
    super("SlotModel");

    const {
      SourceCenterX,
      SourceCenterY,
      SourceHeight,
      SourceWidth,
      SourceX,
      SourceY,
      height,
      layer,
      name,
      width,
      x,
      y,
    } = data;
    this.#sourceCenterX = SourceCenterX;
    this.#sourceCenterY = SourceCenterY;
    this.#sourceHeight = SourceHeight;
    this.#sourceWidth = SourceWidth;
    this.#sourceX = SourceX;
    this.#sourceY = SourceY;
    this.#height = height;
    this.#width = width;
    this.#layer = layer;
    this.#name = name;
    this.#x = x;
    this.#y = y;
    this.#texture = texture;
  }

  get sourceCenterX() {
    return this.#sourceCenterX;
  }

  get sourceCenterY() {
    return this.#sourceCenterY;
  }
  get sourceHeight() {
    return this.#sourceHeight;
  }
  get sourceWidth() {
    return this.#sourceWidth;
  }
  get sourceX() {
    return this.#sourceX;
  }
  get sourceY() {
    return this.#sourceY;
  }
  get height() {
    return this.#height;
  }
  get width() {
    return this.#width;
  }
  get layer() {
    return this.#layer;
  }
  get name() {
    return this.#name;
  }
  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
  get texture() {
    return this.#texture;
  }
}
