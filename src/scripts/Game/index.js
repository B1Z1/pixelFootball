import { FootballField } from "../FootballField";
import { Player } from "../Player";
import { store } from "../Store";

export class Game {
  constructor() {
    this.width = store.game.width = window.innerWidth;
    this.height = store.game.height = window.innerHeight;
    this.canvas = document.createElement("canvas");
    this.ctx = store.game.ctx = this.canvas.getContext("2d");
    this.FootballField = new FootballField();
    this.PlayerFirst = new Player("first");
    this.PlayerSecond = new Player("second");
    this.clickedKeys = [];
    this.render = this.render.bind(this);

    this.init();
  }

  init() {
    this.updateSizes();
    this.setupCanvas();
    this.FootballField.setupField();
    this.setupPlayers();
    this.setupKeyboardControls();

    this.render();
  }

  setupPlayers() {
    store.player.first.x = this.width / 2 - 64;
    store.player.first.y = this.height / 2;
    store.player.second.x = this.width / 2 + 64;
    store.player.second.y = this.height / 2;

    this.PlayerFirst.setupPlayer(store.player.first.x, store.player.first.y);
    this.PlayerSecond.setupPlayer(store.player.second.x, store.player.second.y);
  }

  updateSizes() {
    this.width = store.game.width = window.innerWidth;
    this.height = store.game.height = window.innerHeight;
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

  setupKeyboardControls() {
    window.addEventListener("keydown", ev => {
      const { key } = ev;

      if (
        (key === "w" ||
          key === "d" ||
          key === "s" ||
          key === "a" ||
          key === "ArrowUp" ||
          key === "ArrowRight" ||
          key === "ArrowDown" ||
          key === "ArrowLeft") &&
        !this.clickedKeys.find(el => el === key)
      ) {
        this.clickedKeys.push(key);
      }

      this.clickedKeys.forEach(el => {
        switch (el) {
          case "w": {
            this.PlayerFirst.goUp();
            break;
          }
          case "d": {
            this.PlayerFirst.goRight();
            break;
          }
          case "s": {
            this.PlayerFirst.goDown();
            break;
          }
          case "a": {
            this.PlayerFirst.goLeft();
            break;
          }
          case "ArrowUp": {
            this.PlayerSecond.goUp();
            break;
          }
          case "ArrowRight": {
            this.PlayerSecond.goRight();
            break;
          }
          case "ArrowDown": {
            this.PlayerSecond.goDown();
            break;
          }
          case "ArrowLeft": {
            this.PlayerSecond.goLeft();
            break;
          }
        }
      });
    });

    window.addEventListener("keyup", ev => {
      const { key } = ev;
      switch (key) {
        case "ArrowRight":
        case "ArrowLeft": {
          this.PlayerSecond.resetSpeedX();
          break;
        }
        case "ArrowUp":
        case "ArrowDown": {
          this.PlayerSecond.resetSpeedY();
          break;
        }
        case "a":
        case "d": {
          this.PlayerFirst.resetSpeedX();
          break;
        }
        case "w":
        case "s": {
          this.PlayerFirst.resetSpeedY();
          break;
        }
      }
      this.clickedKeys = this.clickedKeys.filter(el => el !== key);
    });
  }

  calculateDistanceBetweenPlayers() {
    const firstPlayerCoords = this.PlayerFirst.getCoords();
    const secondPlayerCoords = this.PlayerSecond.getCoords();
    return Math.sqrt(
      (secondPlayerCoords.x - firstPlayerCoords.x) ** 2 +
        (secondPlayerCoords.y - firstPlayerCoords.y) ** 2
    );
  }

  render() {
    const playerRadius = store.player.radius;
    const distanceBetweenPlayers = this.calculateDistanceBetweenPlayers();

    if (
      distanceBetweenPlayers < playerRadius * 2 &&
      (!this.PlayerFirst.isShocked() || !this.PlayerSecond.isShocked())
    ) {
      const shockNum = Math.floor(Math.random() * 2) + 1;
      this.PlayerFirst.shock();
      this.PlayerSecond.shock();
      this.canvas.classList.add(`shock-canvas-${shockNum}`);
      setTimeout(() => {
        this.canvas.classList.remove(`shock-canvas-${shockNum}`);
      }, 1000);
    }

    this.FootballField.update();
    this.PlayerFirst.update();
    this.PlayerSecond.update();

    requestAnimationFrame(this.render);
  }
}
