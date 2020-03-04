export class FootballField {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.fieldColor = "#2D761A";
    this.fieldFragmentColor = "#4b9e36";
    this.lineColor = "#ffffff";
    this.lineCount = 8;
    this.lineGap = 64;
    this.fieldGap = 48;
    this.middleCircleRadius = 64;
    this.gateSizes = {
      width: 20,
      height: 64
    };
    this.gateCoords = [];
  }

  setupField() {
    this.setGateCoords();
    this.setMainFieldColor();
    this.drawFieldLightLines();
    this.drawFieldLine();
    this.drawGates();
  }

  setGateCoords() {
    const { width, height } = this.canvas;

    this.gateCoords = [
      {
        x: this.fieldGap / 2 + 4,
        y: height / 2 - this.gateSizes.height / 2
      },
      {
        x: width - this.fieldGap,
        y: height / 2 - this.gateSizes.height / 2
      }
    ];
  }

  setMainFieldColor() {
    this.ctx.fillStyle = this.fieldColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawFieldLightLines() {
    const { width, height } = this.canvas;
    const lineWidth = Math.floor(width / this.lineCount);

    for (let i = 0; i < this.lineCount; i++) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.fieldFragmentColor;
      this.ctx.fillRect(
        lineWidth * i + this.lineGap / 2,
        0,
        lineWidth - this.lineGap,
        height
      );
      this.ctx.closePath();
    }
  }

  drawFieldLine() {
    const { width, height } = this.canvas;
    this.ctx.strokeStyle = this.lineColor;

    this.ctx.beginPath();
    this.ctx.strokeRect(
      this.fieldGap,
      this.fieldGap,
      width - this.fieldGap * 2,
      height - this.fieldGap * 2
    );
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.moveTo(width / 2, this.fieldGap);
    this.ctx.lineTo(width / 2, height - this.fieldGap);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(
      width / 2,
      height / 2,
      this.middleCircleRadius,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawGates() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.strokeRect(
      this.gateCoords[0].x,
      this.gateCoords[0].y,
      this.gateSizes.width,
      this.gateSizes.height
    );
    this.ctx.strokeRect(
      this.gateCoords[1].x,
      this.gateCoords[1].y,
      this.gateSizes.width,
      this.gateSizes.height
    );
    this.ctx.closePath();
  }

  update() {
    this.setupField();
  }
}
