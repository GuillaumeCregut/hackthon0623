class Vehicule {
  constructor(size, x, y, strength, tileFormat, canvas, ctx) {
    this.size = size;
    this.damage = 0;
    this.strength = strength;
    this.picture = './assets/tanks/tank.png';
    this.x = x;
    this.y = y;
    this.loaded = false;
    this.tileFormat = tileFormat;
    this.canvas = canvas;
    this.ctx = ctx;
    this.placeVehicule(this.x, this.y, 0);
    this.shotCount = 0;
  }

  shoot(cell) {
    if (this.damage >= this.size) return;
    const centerX = cell.x * (this.tileFormat.w * 1.5);
    const centerY = cell.y * (this.tileFormat.h * 1.5);
    const sound = new Audio('./assets/sounds/shot.mp3');
    sound.play();
    this.shotCount++;
    //animate shot
    const centerPosition = this.getCenterCell();
    console.log('cells', centerPosition, 'center target', centerX, centerY);
    //Calcul de la trajectoire
    const xFinal = centerX - centerPosition.x;
    const yFinal = centerY - centerPosition.y;
    const cellPosition = this.getCell();
    const A = cell.x - cellPosition.x;
    const B = cell.y - cellPosition.y;
    let angleFire = 0;
    let translateX = -50;
    let translateY = -50;

    //Calcul rotation
    if (A === 0 && B !== 0) {
      //Rotation droite ou gauche suivant le sens de B
      if (B > 0) {
        //droite
        angleFire = -90;
        translateX = -50;
        console.log('cas A', A, B);
      } else {
        angleFire = 90;
        console.log('cas B', A, B);
        //translateX = -100;
      }
    }
    if (B === 0 && A !== 0) {
      //Rotation haut bas suivant sens de A
      if (A < 0) {
        //haut
        angleFire = 0;
        translateX = -50;
        translateY = -50;
        console.log('cas C', A, B);
      } else {
        angleFire = 180;
        translateX = -50;
        console.log('cas D', A, B);
      }
    }
    bullet.style.top = `${centerPosition.x}px`;
    bullet.style.left = `${centerPosition.y}px`;
    console.log(
      `rotate(${angleFire}deg) translate(${translateX}%,${translateY}%)`
    );
    bullet.style.transform = `translate(${translateX}%,${translateY}%) rotate(${angleFire}deg)`;
    bullet.classList.toggle('bullet-hide');
    //launch animation

    let tanAlpha = 0;
    let fireAngle = 0;
    console.log(A, B);
    const ctx2 = this.canvas.getContext('2d');
    ctx2.save();
    ctx2.translate(centerPosition.x, centerPosition.y);
    ctx2.rotate(fireAngle);
    ctx2.translate(-centerPosition.x, -centerPosition.y);

    // const bulletImg = new Image();
    // bulletImg.src = './assets/tanks/bullet.png';
    // bulletImg.onload = () => {
    //   ctx2.drawImage(bulletImg, centerPosition.x, centerPosition.y, 40, 40);
    // };
  }

  takeDamage(damage) {
    if (this.damage - damage > size) return 0;
    this.damage += damage;
    return this.damage;
  }

  getCell() {
    const x = Math.floor(this.x / this.tileFormat.w);
    const y = Math.floor(this.y / this.tileFormat.h);
    return { x, y };
  }

  getCenterCell() {
    const coord = this.getCell();
    const x = coord.x * this.tileFormat.w + this.tileFormat.w / 2;
    const y = coord.x * this.tileFormat.h + this.tileFormat.h / 2;
    return { x, y };
  }

  placeVehicule(x, y, angle = 0) {
    if (this.damage >= this.size) return;
    const sound = new Audio('./assets/sounds/run.mp3');
    sound.play();
    let path = './assets/tanks/tank1.png';
    switch (angle) {
      case 0:
        path = './assets/tanks/tankdown.png';
        break;
      case 90:
        path = './assets/tanks/tankright.png';
        break;
      case 180:
        './assets/tanks/tank1.png';
        break;
      case 270:
        path = './assets/tanks/tankleft.png';
        break;
    }
    const centerCell = this.getCenterCell();
    const img = new Image();
    this.x = x;
    this.y = y;
    img.src = path;

    img.onload = () => {
      let ratio = 0;
      let imageHeight = 0;
      let imageWidth = 0;
      if (img.width > img.height) {
        imageWidth = this.tileFormat.w;
        ratio = img.width / this.tileFormat.w;
        imageHeight = img.height / ratio;
      } else {
        imageHeight = this.tileFormat.h;
        ratio = img.height / this.tileFormat.h;
        imageWidth = img.width / ratio;
      }
      // this.ctx.translate(centerCell.x, centerCell.y);
      // this.ctx.rotate((angle * Math.PI) / 180);
      // this.ctx.translate(-centerCell.x, -centerCell.y);
      this.ctx.drawImage(img, x, y, imageWidth, imageHeight);
    };
  }
}

export default Vehicule;
