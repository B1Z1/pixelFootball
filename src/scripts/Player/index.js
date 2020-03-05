import { store } from "../Store";

export class Player {
  constructor(which) {
    this.wichPlayer = which;

    this.ctx = store.game.ctx;
    this.fieldWidth = store.game.width;
    this.fieldHeight = store.game.height;
    this.fieldGap = store.footballField.fieldGap;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 8;
    this.shocked = false;
    this.shockedTimer = null;

    this.playerCoords = {
      x: 0,
      y: 0
    };

    this.radius = store.player.radius;
    this.color = store.player.color;
  }

  setupPlayer(x, y) {
    this.playerCoords = {
      x: x,
      y: y
    };

    this.drawPlayer();
  }

  drawPlayer() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(
      this.playerCoords.x,
      this.playerCoords.y,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.closePath();
  }

  resetSpeedX() {
    this.speedX = 0;
  }

  resetSpeedY() {
    this.speedY = 0;
  }

  goLeft() {
    this.speedX = -this.maxSpeed;
  }

  goRight() {
    this.speedX = this.maxSpeed;
  }

  goUp() {
    this.speedY = -this.maxSpeed;
  }

  goDown() {
    this.speedY = this.maxSpeed;
  }

  playerXBiggerThenEndOfField() {
    return this.fieldWidth - this.fieldGap - this.radius < this.playerCoords.x;
  }

  playerXLessThenStartOfField() {
    return this.fieldGap + this.radius > this.playerCoords.x;
  }

  playerYLessThenStartOfField() {
    return this.fieldGap + this.radius > this.playerCoords.y;
  }

  playerYBiggerThenEndOfField() {
    return this.fieldHeight - this.fieldGap - this.radius < this.playerCoords.y;
  }

  getCoords() {
    return this.playerCoords;
  }

  shock() {
    this.shocked = true;
    this.shockedTimer = setTimeout(() => {
      this.shocked = false;
    }, 2000);
  }

  isShocked() {
    return this.shocked;
  }

  update() {
    const startOfField = this.fieldGap + this.radius;
    const endOfFieldX = this.fieldWidth - this.fieldGap - this.radius;
    const endOfFieldY = this.fieldHeight - this.fieldGap - this.radius;

    if (!this.shocked) {
      this.playerCoords.x += this.speedX;
      this.playerCoords.y += this.speedY;
    } else {
      this.playerCoords.x -= this.speedX;
      this.playerCoords.y -= this.speedY;
    }

    if (this.playerXBiggerThenEndOfField()) this.playerCoords.x = endOfFieldX;
    if (this.playerXLessThenStartOfField()) this.playerCoords.x = startOfField;
    if (this.playerYLessThenStartOfField()) this.playerCoords.y = startOfField;
    if (this.playerYBiggerThenEndOfField()) this.playerCoords.y = endOfFieldY;

    if (this.wichPlayer === "first") {
      store.player.first.x = this.playerCoords.x;
      store.player.first.y = this.playerCoords.y;
    } else if (this.wichPlayer === "second") {
      store.player.first.x = this.playerCoords.x;
      store.player.first.y = this.playerCoords.y;
    }

    this.drawPlayer();
  }
}
