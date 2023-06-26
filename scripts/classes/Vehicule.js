class Vehicule {
  constructor(size, start, align, strength) {
    this.start = start;
    this.align = align; //true, vertical, false horizontal
    this.size = size;
    this.damage = 0;
    this.strength = strength;
    this.picture = './assets/tanks/tank.png';
  }
  shoot() {}
  takeDamage(damage) {
    if (this.damage - damage > size) return 0;
    this.damage += damage;
    return this.damage;
  }
}

export default Vehicule;
