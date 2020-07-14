const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const canvasHeight = 600;
const canvasWidth = 600;
const pipeNumbers = 100;
const pipeGap = 100;
const dy = -2;
const acceleration = 1;
const pipeWidth = 50;
const sideGap = 200;
const middleGap = 100;

canvas.height = canvasHeight;
canvas.width = canvasWidth;
canvas.style.background = '';

let showGen = document.getElementById('generation');
let alive = document.getElementById('alive');
let best_score = document.getElementById("best_score");
let best_scorer = document.getElementById("best_scorer");

let generation = 1;
let bestScorerGen = 1;
let won = false;
let bestBird;

//document.addEventListener('keydown', play);

let pipe = [];
let dx = -2;
let l = 0, r = 7;
let finishGame = false;
let pipeData = [];
let t;
let totalDx = 0;
let d = 0;
let bestScore = 0;

function play(event) {
    if (event.code === "Space") {
        bird.vel = -10;
    }
}

function reset() {
    l = 0;
    r = 7;
    finishGame = false;
    totalDx = 0;
    d = 0;
    //bestScore = 0;

    let firstPipeHeight = 100;
    let gap = 0;

    for (let i = 0; i < pipeNumbers; i++) {
        firstPipeHeight = pipeData[i];
        let ob = {
            a: new Rectangle(
                context,
                canvas.width + gap,
                0,
                pipeWidth,
                firstPipeHeight,
                "black",
                "green"
            ),
            b: new Rectangle(
                context,
                canvas.width + gap,
                firstPipeHeight + middleGap,
                pipeWidth,
                canvas.height,
                "black",
                "green"
            ),
        };
        pipe[i] = ob;
        gap = gap + pipeWidth + sideGap;
    }
}

function Bird() {
    this.bird = new Rectangle(context, 100, 100, 30, 30, "green", "yellow");
    this.brain = new NeuralNetwork(3, 4, 1);
    this.vel = 0;
    this.score = 0;
    this.distanceTraveled = 0;
    this.passed = -1;
    this.dead = false;

    this.reset = function () {
        this.bird = new Rectangle(context, 100, 100, 30, 30, "green", "yellow");
        this.vel = 0;
        this.score = 0;
        this.distanceTraveled = 0;
        this.passed = -1;
        this.dead = false;
    }
}

pipe = new Pipe(pipeNumbers, pipeWidth, middleGap, sideGap);

function generatePipe() {
    let firstPipeHeight = 100;
    let gap = 0;

    for (let i = 0; i < pipeNumbers; i++) {
        firstPipeHeight = generateRandom(100, canvas.height - 300);
        pipeData.push(firstPipeHeight);
        let ob = {
            a: new Rectangle(
                context,
                canvas.width + gap,
                0,
                pipeWidth,
                firstPipeHeight,
                "black",
                "green"
            ),
            b: new Rectangle(
                context,
                canvas.width + gap,
                firstPipeHeight + middleGap,
                pipeWidth,
                canvas.height,
                "black",
                "green"
            ),
        };
        pipe[i] = ob;
        gap = gap + pipeWidth + sideGap;
    }
}



function checkIfGameOver(bird) {
    for (let i = l; i < r; i++) {
        let ob1 = pipe[i].a;
        let ob2 = pipe[i].b;
        if (
            bird.bird.x < ob1.x + ob1.width &&
            bird.bird.x + bird.bird.width > ob1.x &&
            bird.bird.y < ob1.y + ob1.height &&
            bird.bird.y + bird.bird.height > ob1.y
        ) {
            return true;
        }
        if (
            bird.bird.x < ob2.x + ob2.width &&
            bird.bird.x + bird.bird.width > ob2.x &&
            bird.bird.y < ob2.y + ob2.height &&
            bird.bird.y + bird.bird.height > ob2.y
        ) {
            return true;
        }
        if (
            bird.bird.y >= canvas.height || 
            bird.bird.y < 0
        ) {
            return true;
        }
    }
    return false;
}

function generateInputForNN(bird) {
    let verticalDisFromFirstPipe = pipe[bird.passed + 1].a.y - bird.bird.y;
    let verticalDisFromSecondPipe = pipe[bird.passed + 1].b.y - bird.bird.y;
    let horizontalDisFromPipe = pipe[bird.passed + 1].a.x - bird.bird.x;

    return [verticalDisFromFirstPipe, 
        verticalDisFromSecondPipe, 
        horizontalDisFromPipe];
}

function calculateScore(bird) {
    if (bird.bird.x > pipe[bird.passed + 1].a.x + pipeWidth) {
        bird.passed++;
        bird.score++;
    }
}


function drawFrame(population, again) {
    for (let i = l; i < r; i++) {
        pipe[i].a.x += dx;
        pipe[i].b.x += dx;
        pipe[i].a.draw();
        pipe[i].b.draw();
    }
    totalDx += dx;

    for (let i = 0; i < population.length; i++) {
        if (population[i].dead) {
            continue;
        }
        if (again && i == bestBird) {
            if (population[i].vel < 10) {
                population[i].vel += 1;
            }
            population[i].bird.y += population[i].vel;
            new Circle(
                context,
                population[i].bird.x + 15,
                population[i].bird.y + 15,
                15,
                "red",
                "yellow",
                population[i].score,
                "black",
                10
            ).draw();
            continue;
        }
        population[i].distanceTraveled = -totalDx;
        if (population[i].vel < 10) {
            population[i].vel += 1;
        }
        population[i].bird.y += population[i].vel;
        new Circle(context, population[i].bird.x + 15, population[i].bird.y + 15, 15, 'red', 'yellow', population[i].score, 'black', 10).draw();
    }

    if (pipe[l].a.x < -pipeWidth && r + 1 < pipeNumbers) {
        l++;
        r++;
        pipe[r - 1].a.x += totalDx;
        pipe[r - 1].b.x += totalDx;
    }
}

function playGame(population, again) {
    clearCanvas(context);

    drawFrame(population, again);
    let flag = true;

    if (again) {
        flag = false;
        console.log(population[bestBird])
        let input = generateInputForNN(population[bestBird]);
        //console.log(population[i].brain.predictJump(input));
        if (population[bestBird].brain.predictJump(input)) {
            population[bestBird].vel = -10;
        }
        calculateScore(population[bestBird]);
        if (
            checkIfGameOver(population[bestBird]) ||
            population[bestBird].score >= pipeNumbers
        ) {
            population[bestBird].dead = true;
            d++;
        } else {
            flag = false;
        }
        if (population[bestBird].score >= pipeNumbers - 5) {
            won = true;
        }
    }
    else {
        for (let i = 0; i < population.length; i++) {
        //console.log(population[i]);
        if (!population[i].dead) {
            let input = generateInputForNN(population[i]);
            //console.log(population[i].brain.predictJump(input));
            if (population[i].brain.predictJump(input)) {
                population[i].vel = -10;
            }
            calculateScore(population[i]);
            if (checkIfGameOver(population[i]) || population[i].score >= pipeNumbers) {
                population[i].dead = true;
                d++;
            } 
            else {
                flag = false;
            }
            if (population[i].score > bestScore) {
                bestScore = population[i].score;
                bestScorerGen = generation;
                console.log(i)
                bestBird = i;
            }
        }
        if (population[i].score >= pipeNumbers-5) {
            won = true;
            
        }
    }
    }
    
    //console.log('Alive: ', population.length - d)
    //console.log("Best Score: ", bestScore);
    let al = population.length - d;
    showGen.innerHTML = "Generation: " + generation;
    alive.innerHTML = "Alive: " + al;
    best_score.innerHTML = "Best Score: " + bestScore;
    best_scorer.innerHTML = "Best Generation: " + bestScorerGen;

    if(flag || won) {
        console.log('hhhhhhhhhh')
        finishGame = true;
        return;
    }
    
    t = setTimeout(function () {
        playGame(population, again);
    }, 1);
   // playGame(population);
}

//generatePipe();
//playGame();



