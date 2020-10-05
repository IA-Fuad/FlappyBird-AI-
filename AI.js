let N = 200;
let nnInputUnit = 3;
let nnMiddleLayerUnit = 4;
let nnOutputUnit = 1;

let mutationRate = 0.3;

let birdInitX = canvas.width / 2 - sideGap;
let birdInitY = 100;
let birdWidth = 30;
let birdHeight = 30;
let birdRadius = 15;

let generation = 1;
let bestScorerGen = 1;
let tempGen = 1;


let birds = new Population(N);
birds.generateNewPopulation();

let stop = false;

function init() {
    pipe = new Pipe(pipeNumbers, pipeWidth, middleGap, sideGap);
    pipe.generate();
    playGame(birds);
    train();
}


function train() {
    if (won) {
        clearCanvas(context);
        alert("Congratulation!");
        return;
    }
    if (finishGame) {
        pipe = new Pipe(pipeNumbers, pipeWidth, middleGap, sideGap, pipe.originalCopy);
        pipe.generate();

        reset();

        generation++;

        birds.calculateFitness();

        let newPopulation = birds.crossOver();
        newPopulation = birds.mutation(mutationRate, newPopulation);
        birds = new Population(N, newPopulation);

        playGame(birds);
    }
    setTimeout(train, 100);
}

init();
// train();


// document.querySelector("#playAgain").addEventListener("click", function () {
//     let bestBird = new Population(1);
//     bestBird.generateNewPopulation();
//     bestBird.population[0].brain = birds.population[birds.bestFit].brain;
//     pipe = new Pipe(pipeNumbers, pipeWidth, middleGap, sideGap);
//     pipe.generate();
//     reset();
//     won = false;
//     playGame(bestBird);
// });