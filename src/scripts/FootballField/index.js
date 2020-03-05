import { store } from "../Store";

export class FootballField {
  constructor() {
    const { game, footballField } = store;
    const { ctx, width, height } = game;
    const {
      fieldGap,
      fieldFragmentColor,
      fieldColor,
      middleCircleRadius,
      lineGap,
      lineCount,
      lineColor,
      gateCoords,
      gateSizes
    } = footballField;

    this.ctx = ctx;
    this.fieldWidth = width;
    this.fieldHeight = height;
    this.fieldColor = fieldColor;
    this.fieldFragmentColor = fieldFragmentColor;
    this.lineColor = lineColor;
    this.lineCount = lineCount;
    this.lineGap = lineGap;
    this.fieldGap = fieldGap;
    this.middleCircleRadius = middleCircleRadius;
    this.gateSizes = gateSizes;
    this.gateCoords = gateCoords;
  }

  setupField() {
    this.setFieldSizes();
    this.setGateCoords();
    this.setMainFieldColor();
    this.drawFieldLightLines();
    this.drawFieldLine();
    this.drawGates();
  }

  setFieldSizes() {
    this.fieldWidth = store.game.width;
    this.fieldHeight = store.game.height;
  }

  setGateCoords() {
    this.gateCoords = store.footballField.gateCoords = [
      {
        x: this.fieldGap / 2 + 4,
        y: this.fieldHeight / 2 - this.gateSizes.height / 2
      },
      {
        x: this.fieldWidth - this.fieldGap,
        y: this.fieldHeight / 2 - this.gateSizes.height / 2
      }
    ];
  }

  setMainFieldColor() {
    this.ctx.fillStyle = this.fieldColor;
    this.ctx.fillRect(0, 0, this.fieldWidth, this.fieldHeight);
  }

  drawFieldLightLines() {
    const lineWidth = Math.floor(this.fieldWidth / this.lineCount);

    for (let i = 0; i < this.lineCount; i++) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.fieldFragmentColor;
      this.ctx.fillRect(
        lineWidth * i + this.lineGap / 2,
        0,
        lineWidth - this.lineGap,
        this.fieldHeight
      );
      this.ctx.closePath();
    }
  }

  drawFieldLine() {
    this.ctx.strokeStyle = this.lineColor;

    this.ctx.beginPath();
    this.ctx.strokeRect(
      this.fieldGap,
      this.fieldGap,
      this.fieldWidth - this.fieldGap * 2,
      this.fieldHeight - this.fieldGap * 2
    );
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.moveTo(this.fieldWidth / 2, this.fieldGap);
    this.ctx.lineTo(this.fieldWidth / 2, this.fieldHeight - this.fieldGap);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(
      this.fieldWidth / 2,
      this.fieldHeight / 2,
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
