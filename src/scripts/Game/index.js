import { FootballField } from "../FootballField";

export class Game {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.FootballField = new FootballField(this.ctx, this.canvas);

    this.render = this.render.bind(this);

    this.init();
  }

  init() {
    this.updateSizes();
    this.setupCanvas();
    this.FootballField.setupField();

    this.render();
  }

  updateSizes() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  setupCanvas() {
    this.setCanvasSize();
    document.body.appendChild(this.canvas);
    window.addEventListener("resize", () => {
      this.updateSizes();
      this.setCanvasSize();
    });
  }

  setCanvasSize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  render() {
    this.FootballField.setupField();
    requestAnimationFrame(this.render);
  }
}
