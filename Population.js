class Population {
  constructor (size) {
    this.population = this.createPopulation(size);
    this.generationsCounter = 0;
  }

  getLivingBeingFitness(livingBeing) {
    let fitness = 0;
    for (let i = 0 ; i < livingBeing.DNA.gens.length; ++i)
      if (livingBeing.DNA.gens[i] === 1)
        fitness += 1;

    return fitness;
  }

  compareFitness(LivingBeing1, LivingBeing2) {
    let auxPopulation = new Population();
    return auxPopulation.getLivingBeingFitness(LivingBeing2) - auxPopulation.getLivingBeingFitness(LivingBeing1);
  }

  reapPopulation(population) {
    population.sort(this.compareFitness);
    let remmants = [];
    for (let i = 0; i < population.length * 0.25; ++i)
      remmants.push(population[i]);

    return remmants;
  }

  raiseNewGeneration() {
    let parents = this.reapPopulation(this.population);
    let newPopulation = [];

    while (newPopulation.length < 16) {
      let parent1 = Math.floor(Math.random() * 4);
      let parent2 = Math.floor(Math.random() * 4);

      // Preventing the same individual from having a baby with itself
      if (parent1 !== parent2)
        newPopulation.push(parents[parent1].getBaby(parents[parent2]));
    }

    this.population = newPopulation;
    this.generationsCounter += 1;
  }

  showPopulation(population) {
    console.log("//// Genetarion " + this.generationsCounter);
    for (let i = 0; i < this.population.length; ++i)
      console.log(
        "Individual " + i + ": " + this.getLivingBeingFitness(this.population[i])
      );

    console.log("\n//Selected Parents: ");
    let selectedParents = this.reapPopulation(this.population);
    for (let i = 0; i < selectedParents.length; ++i) {
      console.log("Parent " + i + ": " + this.getLivingBeingFitness(selectedParents[i]));
    }
    console.log("\n\n");
  }

  createPopulation(size) {
    let population = [];
    for (let i = 0; i < size; ++i) {
      population.push(new LivingBeing());
    }
    return population;
  }

  gotPerfectParents() {
    let sample = this.reapPopulation(this.population);

    let perfectParentsCounter = 0;
    for (let i = 0; i < sample.length; ++i)
      if (this.getLivingBeingFitness(sample[i]) == 16)
        perfectParentsCounter += 1;

    return perfectParentsCounter === sample.length;
  }
}
