function main() {
  let myPopulation = new Population(16);
  myPopulation.showPopulation();

  while (!myPopulation.gotPerfectParents()) {
    myPopulation.raiseNewGeneration();
    myPopulation.showPopulation();
  }

  console.log("Total Generations: " + (myPopulation.generationsCounter + 1));
}
