import GameBoard from './classes/GameBoard.js';
import Player from './classes/Player.js';
import Vehicule from './classes/Vehicule.js';

const newGameBoard = new GameBoard(10, 10);
let map = [];
const baseFolder = './assets/tiles/';
const tileFormat = { w: 64, h: 64 };
const tiles = [
  '77military7.bmp',
  '34earth4.bmp',
  '81objecttile1.bmp',
  '12water2.bmp',
];

const startBtn = document.getElementById('start-btn');

const drawTile = (ctx, tile, x, y) => {
  const img = new Image(tileFormat.w, tileFormat.h);
  img.src = baseFolder + tile;
  img.onload = () => {
    ctx.drawImage(img, x, y);
  };
};

const displayBoard = () => {
  const player1Canvas = document.getElementById('canvas1');
  player1Canvas.width = tileFormat.w * 10;
  player1Canvas.height = tileFormat.h * 10;
  const ctx1 = player1Canvas.getContext('2d');
  for (let i = 0; i < newGameBoard.width; i++) {
    for (let j = 0; j < newGameBoard.height; j++) {
      const tile = map[i][j];
      console.log(tile);
      drawTile(ctx1, tiles[tile], i * tileFormat.w, j * tileFormat.h);
    }
  }
};

startBtn.addEventListener('click', () => {
  map = [...newGameBoard.getMap()];
  displayBoard();
  //const player
});
