class GameBoard {
  /**
   *
   * @param {*} height height of gameBoard
   * @param {*} witdh  width of gameBoard
   */
  constructor(height, width, tileFormat, canvas) {
    this.height = height;
    this.width = width;
    this.tileFormat = tileFormat;
    this.canvas = canvas;
  }
  /**
   *
   * @returns array with game board
   */
  getMap() {
    const tileType = [0, 1, 2, 3];
    const board = [];
    for (let i = 0; i < this.width; i++) {
      const lineBoard = [];
      let randomElement = 0;
      for (let j = 0; j < this.height; j++) {
        if (i < 2 && j < 2) {
          randomElement = 0;
        } else {
          randomElement = tileType[Math.floor(Math.random() * tileType.length)];
        }
        lineBoard.push(randomElement);
      }
      board.push(lineBoard);
    }
    return board;
  }

  getCell(x, y) {
    const xCell = Math.floor(x / this.tileFormat.w);
    const yCell = Math.floor(y / this.tileFormat.h);
    return { x: xCell, y: yCell };
  }
}

export default GameBoard;
