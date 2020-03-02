export class Game {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.init();
  }

  init() {
    this.updateSizes();
    this.setupCanvas();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateSizes() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  setupCanvas() {
    this.setCanvasSize();
    document.body.appendChild(this.canvas);
  }

  setCanvasSize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}
