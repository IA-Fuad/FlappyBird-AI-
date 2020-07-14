let population = new Population(100);
population.generateNewPopulation();

let stop = false;

function init() {
    generatePipe();
    playGame(population.population, false);
}


function fitness() {
    if (won) {
        clearCanvas(context);
        alert("Congratulation!");
        return;
    }
    if (stop) {
        return;
    }
    if (finishGame) {
        //console.log(population.population)
        population.calculateFitness();
        console.log('score', population.bestScore);
        population.crossOver();
        population.mutation(0.4);
        population.reset();
        reset();
        for (let i = 0; i < population.population.length; i++) {
            population.population[i].reset();
        }
        generation++;
        playGame(population.population, false)
        //return;
    }
    setTimeout(fitness, 10);
}

function playAgain() {
    stop = true;
    won = false;
    console.log(bestBird)
    generatePipe();
    population.reset();
    reset();
    playGame(population.population, true);
}

init();
fitness();

document.querySelector("#playAgain").addEventListener("click", playAgain);
