import GameBoard from './classes/GameBoard.js';
import Player from './classes/Player.js';
import Vehicule from './classes/Vehicule.js';

const modal = document.getElementById('win-modal');
const dialog = document.getElementById('dialog-list');
const player1Canvas = document.getElementById('canvas1');
const startBtn = document.getElementById('start-btn');
const lineNumber = document.getElementById('nb-line');
const ColumnNumber = document.getElementById('nb-column');
//const bouton = document.getElementById('stop-btn');

const ctx1 = player1Canvas.getContext('2d');
const ctx2 = player1Canvas.getContext('2d');

const shotArray = [];
let init = false;
const obstacle = 2;
const tileFormat = { w: 64, h: 64 };
let mapWitdh = 10;
let mapHeight = 10;
let map = [];
const baseFolder = './assets/tiles/';
const tiles = [
  '77military7.bmp',
  '34earth4.bmp',
  '81objecttile1.bmp',
  '12water2.bmp',
];

const newGameBoard = new GameBoard(
  mapWitdh,
  mapHeight,
  tileFormat,
  player1Canvas
);

player1Canvas.width = tileFormat.w * 10;
player1Canvas.height = tileFormat.h * 10;

const player1 = new Player('');

const player2 = new Player('IA');
const p2Vehicule = { x: 1, y: 1, strength: 4, damage: 0 };
player2.addVehicule(p2Vehicule);

const clearDialog = () => {
  while (dialog.firstChild) {
    dialog.removeChild(dialog.lastChild);
  }
};

const appendDialog = (line) => {
  const newLine = document.createElement('li');
  newLine.textContent = line;
  dialog.appendChild(newLine);
};

const displayWin = () => {
  modal.classList.remove('hidden-modal');
  modal.classList.add('visible-modal');
};

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

const player2Shoot = () => {
  const p2Vehicule = player2.vehicule[0];
  if (p2Vehicule.damage === 1) return;
  //console.log(p2Vehicule);
  const cellX = p2Vehicule.x;
  const cellY = p2Vehicule.y;
  const randomFireX = Math.floor(Math.random() * p2Vehicule.strength);
  const randomFireY = Math.floor(Math.random() * p2Vehicule.strength);
  const signX = Math.random() * 10 > 5;
  const signY = Math.random() * 10 > 5;
  const newCell = { x: 0, y: 0 };
  if (signX) {
    newCell.x = cellX + randomFireX;
  } else {
    newCell.x = cellX - randomFireX;
  }
  if (signY) {
    newCell.y = cellY + randomFireY;
  } else {
    newCell.y = cellY - randomFireY;
  }
  if (newCell.x > 0 && newCell.y > 0) {
    appendDialog(`tir de IA : vers la position (${newCell.x},${newCell.y})`);
    const p1Target = player1.vehicule[0].getCell();
    if (p1Target.x === newCell.x && p1Target.y === newCell.y) {
      appendDialog(
        `tir de IA : position : (${cellX},${cellY}) a détruit votre véhicule`
      );
      player1.vehicule[0].damage = 1;
      const pathImg = './assets/tiles/crash.png';
      const destX = player1.vehicule[0].x * tileFormat.w;
      const destY = player1.vehicule[0].y * tileFormat.h;
      const imageShot = new Image();
      imageShot.src = pathImg;
      imageShot.onload = () => {
        ctx1.resetTransform();
        ctx1.drawImage(imageShot, destX, destY, tileFormat.w, tileFormat.h);
      };
      modal.innerHTML = 'Vous avez perdu';
      displayWin();
    }
  }
};

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
    case 'z':
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
    case 's':
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
    case 'q':
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
    case 'd':
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
  player2Shoot();
};

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
    console.log(target);
    player1.vehicule[0].shoot(target);
    if (
      player2.vehicule[0].x === target.x &&
      player2.vehicule[0].y === target.y
    ) {
      pathImg = './assets/tiles/crash.png';
      shotArray.push({ target: target, value: 1 });
      appendDialog(
        `${player1.name} détruit l'ennemi position (${player2.vehicule[0].x},${player2.vehicule[0].y} en ${player1.vehicule[0].shotCount})`
      );
      displayWin();
      player2.vehicule[0].damage = 1;
      return;
    } else {
      shotArray.push({ target: target, value: 0 });
      appendDialog(
        `${player1.name} tir sur la position (${target.x},${target.y})`
      );
      pathImg = './assets/tiles/burnt.bmp';
    }
    player2Shoot();
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

startBtn.addEventListener('click', () => {
  shotArray.splice(0, shotArray.length);
  const nameBox = document.getElementById('name');
  if (nameBox.value === '') {
    alert('Veuillez saisir votre nom');
    return;
  }
  mapWitdh = parseInt(lineNumber.value, 10);
  mapHeight = parseInt(ColumnNumber.value, 10);
  newGameBoard.height = mapWitdh;
  newGameBoard.width = mapHeight;
  map = [...newGameBoard.getMap()];
  player1.name = nameBox.value;
  modal.classList.remove('visible-modal');
  modal.classList.add('hidden-modal');
  clearDialog();
  //Init player2
  player2.vehicule[0].x = Math.floor(Math.random() * mapWitdh);
  player2.vehicule[0].y = Math.floor(Math.random() * mapHeight);
  displayBoard();
  const newTank = new Vehicule(1, 0, 0, 2, tileFormat, player1Canvas, ctx1);
  player1.addVehicule(newTank);
  appendDialog(`${player1.name} initialise la partie`);
});

window.addEventListener('keypress', (e) => {
  moveVehicule(e.key);
});

//bouton.addEventListener('click', player2Shoot);
