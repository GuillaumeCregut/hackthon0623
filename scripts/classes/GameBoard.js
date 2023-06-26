class GameBoard {
  /**
   *
   * @param {*} height height of gameBoard
   * @param {*} witdh  width of gameBoard
   */
  constructor(height, width) {
    this.height = height;
    this.width = width;
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
      for (let j = 0; j < this.height; j++) {
        const randomElement =
          tileType[Math.floor(Math.random() * tileType.length)];
        lineBoard.push(randomElement);
      }
      board.push(lineBoard);
    }
    return board;
  }
}

export default GameBoard;
