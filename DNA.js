class DNA {
  constructor(gens) {
    this.defaultGensLength = 16;
    this.mutationProbability = 0.025;

    if (typeof gens !== 'undefined') {
      this.gens = gens;
      this.defaultGensLength = this.gens.length;
    }
    else {
      this.gens = [];
      for (let i = 0; i < this.defaultGensLength; ++i) {
        this.gens.push( Math.floor(Math.random() * 2) );
      }
    }
  }

  crossover(that) {
    if (this.gens.length != that.gens.length)
      return;

    let newGens = [];
    for (let i = 0; i < this.gens.length; ++i) {
      // Small mutation probability
      if (Math.random() < this.mutationProbability)
        newGens.push( Math.floor(Math.random() * 2) );
      else
        newGens.push( ((Math.floor(Math.random() * 2)) ? this : that).gens[i] );
    }
    return new DNA(newGens);
  }
}
