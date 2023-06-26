import GameBoard from './classes/GameBoard.js';
import Player from './classes/Player.js';
import Vehicule from './classes/Vehicule.js';
let init = false;
let lastMouseX = 0;
let lastMouseY = 0;
const obstacle = 2;

const tileFormat = { w: 64, h: 64 };
const player1Canvas = document.getElementById('canvas1');
player1Canvas.width = tileFormat.w * 10;
player1Canvas.height = tileFormat.h * 10;
const ctx1 = player1Canvas.getContext('2d');
const mapWitdh = 10;
const mapHeight = 10;
const newGameBoard = new GameBoard(
  mapWitdh,
  mapHeight,
  tileFormat,
  player1Canvas
);
let map = [];
const baseFolder = './assets/tiles/';
const tiles = [
  '77military7.bmp',
  '34earth4.bmp',
  '81objecttile1.bmp',
  '12water2.bmp',
];

const player1 = new Player('Guillaume');

const startBtn = document.getElementById('start-btn');

const drawTile = (ctx, tile, x, y) => {
  const img = new Image(tileFormat.w, tileFormat.h);
  img.src = baseFolder + tile;
  img.onload = () => {
    ctx.drawImage(img, x, y);
  };
};

const displayBoard = () => {
  for (let i = 0; i < newGameBoard.width; i++) {
    for (let j = 0; j < newGameBoard.height; j++) {
      const tile = map[i][j];
      drawTile(ctx1, tiles[tile], i * tileFormat.w, j * tileFormat.h);
    }
  }
  init = true;
};

startBtn.addEventListener('click', () => {
  map = [...newGameBoard.getMap()];
  ctx1.resetTransform();

  displayBoard();
  const newTank = new Vehicule(1, 0, 0, 2, tileFormat, player1Canvas, ctx1);
  player1.addVehicule(newTank);
  player1.vehicule[0].placeVehicule(0, 0, 180);
});

const refreshDraw = () => {
  displayBoard();
  if (player1.vehicule.length > 0) {
    const vx = player1.vehicule[0].x;
    const vy = player1.vehicule[0].y;
    player1.vehicule[0].placeVehicule(ctx1, vx, vy, mapWitdh, mapHeight);
  }
};

player1Canvas.addEventListener('click', (e) => {
  if (!init) return;
  const rect = player1Canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const target = newGameBoard.getCell(mouseX, mouseY);
  const position = player1.vehicule[0]?.getCell(tileFormat) || { x: 0, y: 0 };
  const deltaX = target.x - position.x;
  const deltaY = target.y - position.y;
  const range = player1.vehicule[0]?.strength;
  if (deltaX <= range && deltaY <= range) {
    console.log('tir');
  } else {
    const sound = new Audio('./assets/sounds/wrong.mp3');
    sound.play();
  }
});

window.addEventListener('keypress', (e) => {
  console.log(e.key);
  switch (e.key) {
    case 'u':
      break;
    case 'd':
      break;
    case 'l':
      break;
    case 'r':
      break;
  }
});
