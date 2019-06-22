class LivingBeing {
  constructor(dna) {
    this.DNA = (typeof dna !== 'undefined') ? dna : new DNA();
  }

  getBaby(that) {
    return new LivingBeing(
      this.DNA.crossover(that.DNA)
    );
  }
}
