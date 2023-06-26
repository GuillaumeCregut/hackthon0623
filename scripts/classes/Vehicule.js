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
    let path = './assets/tanks/tank1.png';
    this.image = new Image();
    this.image.onload = () => {
      let ratio = 0;
      let imageHeight = 0;
      let imageWidth = 0;
      if (this.image.width > this.image.height) {
        this.imageWidth = this.tileFormat.w;
        ratio = this.image.width / this.tileFormat.w;
        this.imageHeight = this.image.height / ratio;
      } else {
        this.imageHeight = this.tileFormat.h;
        ratio = this.image.height / this.tileFormat.h;
        this.imageWidth = this.image.width / ratio;
      }
      this.loaded = true;
    };
  }
  shoot() {}
  takeDamage(damage) {
    if (this.damage - damage > size) return 0;
    this.damage += damage;
    return this.damage;
  }

  getCell() {
    const x = this.x % this.tileFormat.w;
    const y = this.y % this.tileFormat.h;
    return { x, y };
  }

  getCenterCell() {
    const coord = this.getCell();
    const x = coord.x * this.tileFormat.w + this.tileFormat.w / 2;
    const y = coord.x * this.tileFormat.h + this.tileFormat.h / 2;
    return { x, y };
  }

  placeVehicule(x, y, angle = 0) {
    let path = './assets/tanks/tank1.png';
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

      this.ctx.translate(centerCell.x, centerCell.y);
      this.ctx.rotate((angle * Math.PI) / 180);
      this.ctx.translate(-centerCell.x, -centerCell.y);
      this.ctx.drawImage(img, x, y, imageWidth, imageHeight);
      this.ctx.rotate(0);
    };
  }
}

export default Vehicule;
