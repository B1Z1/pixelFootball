export let store = {
  /**
   * Game Store
   */
  game: {
    width: 0,
    height: 0,
    ctx: null
  },

  /**
   * Football Field Store
   */
  footballField: {
    fieldColor: "#2D761A",
    fieldFragmentColor: "#4b9e36",
    lineColor: "#ffffff",
    lineCount: 8,
    lineGap: 64,
    fieldGap: 48,
    middleCircleRadius: 64,
    gateSizes: {
      width: 20,
      height: 64
    },
    gateCoords: [
      {
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: 0
      }
    ]
  },

  /**
   * Player Store
   */
  player: {
    radius: 10,
    color: "#000000",

    first: {
      x: 0,
      y: 0
    },
    second: {
      x: 0,
      y: 0
    }
  }
};
