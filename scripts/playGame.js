import GameBoard from './classes/GameBoard.js';
import Player from './classes/Player.js';
import Vehicule from './classes/Vehicule.js';
const shotArray = [];
let init = false;
const obstacle = 2;
const player2Target = { x: 1, y: 1 };

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
      drawTile(ctx1, tiles[tile], j * tileFormat.h, i * tileFormat.w);
    }
  }
  init = true;
};

startBtn.addEventListener('click', () => {
  map = [...newGameBoard.getMap()];
  //Init player2
  const player2X = Math.floor(Math.random() * mapWitdh);
  const player2Y = Math.floor(Math.random() * mapHeight);

  displayBoard();
  const newTank = new Vehicule(1, 0, 0, 2, tileFormat, player1Canvas, ctx1);
  player1.addVehicule(newTank);
});

const refreshDraw = () => {
  displayBoard();
  if (player1.vehicule.length > 0) {
    const vx = player1.vehicule[0].x;
    const vy = player1.vehicule[0].y;
  }
  shotArray.forEach((element) => {
    let pathImg = './assets/tiles/burnt.bmp';
    if (element.value === 1) pathImg = './assets/tiles/crash.png';
    const destX = element.target.x * tileFormat.w;
    const destY = element.target.y * tileFormat.h;
    const imageShot = new Image();
    imageShot.src = pathImg;
    imageShot.onload = () => {
      ctx1.resetTransform();
      ctx1.drawImage(imageShot, destX, destY, tileFormat.w, tileFormat.h);
    };
  });
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
  let pathImg = '';
  if (deltaX <= range && deltaY <= range) {
    player1.vehicule[0].shoot(target);
    if (player2Target.x === target.x && player2Target.y === target.y) {
      pathImg = './assets/tiles/crash.png';
      shotArray.push({ target: target, value: 1 });
      console.log('destroy');
    } else {
      console.log('loupé');
      shotArray.push({ target: target, value: 0 });
      pathImg = './assets/tiles/burnt.bmp';
    }
    const destX = target.x * tileFormat.w;
    const destY = target.y * tileFormat.h;
    const imageShot = new Image();
    imageShot.src = pathImg;
    imageShot.onload = () => {
      ctx1.resetTransform();
      ctx1.drawImage(imageShot, destX, destY, tileFormat.w, tileFormat.h);
    };
  } else {
    const sound = new Audio('./assets/sounds/wrong.mp3');
    sound.play();
  }
});

const moveVehicule = (direction) => {
  const vehiculeUSer = player1.vehicule[0];
  if (!vehiculeUSer) return;
  const nextCell = {
    x: 0,
    y: 0,
  };
  const actualCell = vehiculeUSer.getCell();
  let angle = 0;
  switch (direction) {
    case 'u':
      if (actualCell.y === 0) {
        const sound = new Audio('./assets/sounds/wrong.mp3');
        sound.play();
        return;
      } else {
        angle = 180;
        nextCell.x = actualCell.x;
        nextCell.y = actualCell.y - 1;
      }
      break;
    case 'd':
      if (actualCell.y === mapHeight - 1) {
        const sound = new Audio('./assets/sounds/wrong.mp3');
        sound.play();
        return;
      } else {
        angle = 0;
        nextCell.x = actualCell.x;
        nextCell.y = actualCell.y + 1;
      }
      break;
    case 'l':
      if (actualCell.x === 0) {
        const sound = new Audio('./assets/sounds/wrong.mp3');
        sound.play();
        return;
      } else {
        angle = 270;
        nextCell.x = actualCell.x - 1;
        nextCell.y = actualCell.y;
      }
      break;
    case 'r':
      if (actualCell.x === mapWitdh - 1) {
        const sound = new Audio('./assets/sounds/wrong.mp3');
        sound.play();
        return;
      } else {
        angle = 90;
        nextCell.x = actualCell.x + 1;
        nextCell.y = actualCell.y;
      }

      break;
    default:
      return;
  }
  const cellContain = map[nextCell.y][nextCell.x];
  if (cellContain === obstacle) {
    const sound = new Audio('./assets/sounds/wrong.mp3');
    sound.play();
    return;
  }
  refreshDraw();
  player1.vehicule[0].placeVehicule(
    nextCell.x * tileFormat.w,
    nextCell.y * tileFormat.h,
    angle
  );
};

window.addEventListener('keypress', (e) => {
  moveVehicule(e.key);
});
