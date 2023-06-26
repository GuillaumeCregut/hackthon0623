class Player {
  maxVehicule = 5;
  constructor(name) {
    this.name = name;
    this.vehicule = [];
  }

  addVehicule(vehicule) {
    this.vehicule.push(vehicule);
  }
}

export default Player;
