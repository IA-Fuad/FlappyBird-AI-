const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const canvasHeight = 600;
const canvasWidth = 600;
const pipeNumbers = 5000;
const pipeGap = 100;
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


let won = false;

//document.addEventListener('keydown', play);

let pipe;
let finishGame = false;
let totalDx = 0;
let bestScore = 0;
let l = 0, r = 7;
let dx = -2;

// function play(event) {
//     if (event.code === "Space") {
//         bird.vel = -10;
//     }
// }

function reset() {
    finishGame = false;
    totalDx = 0;
    l = 0;
    r = 7;
    d = 0;
}


function checkIfGameOver(bird) {
    for (let i = l; i < r; i++) {
        let ob1 = pipe.pipes[i].a;
        let ob2 = pipe.pipes[i].b;
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
    let verticalDisFromFirstPipe = pipe.pipes[bird.passed + 1].a.y - bird.bird.y;
    let verticalDisFromSecondPipe = pipe.pipes[bird.passed + 1].b.y - bird.bird.y;
    let horizontalDisFromPipe = pipe.pipes[bird.passed + 1].a.x - bird.bird.x;

    return [verticalDisFromFirstPipe, 
        verticalDisFromSecondPipe, 
        horizontalDisFromPipe];
}

function calculateScore(bird) {
    if (bird.bird.x > pipe.pipes[bird.passed + 1].a.x + pipeWidth) {
        bird.passed++;
        bird.score++;
    }
}


function changePipeState() {
    for (let i = l; i < r; i++) {
        pipe.move(pipe.pipes[i], dx);
        pipe.draw(pipe.pipes[i]);
    }
    totalDx += dx;

    if (pipe.pipes[l].a.x < -pipeWidth && r + 1 < pipeNumbers) {
        l++;
        r++;
        pipe.move(pipe.pipes[r - 1], totalDx);
    }
}

function changeBirdState(b) {
    b.distanceTraveled = -totalDx;
    if (b.vel < 10) {
        b.vel += 1;
    }
    b.bird.y += b.vel;
    b.draw();
}

function playGame(birds) {
    clearCanvas(context);

    changePipeState();

    for (let i = 0; i < birds.N; i++) {
        if (birds.population[i].dead === false) {
            changeBirdState(birds.population[i]);

            let input = generateInputForNN(birds.population[i]);

            if (birds.population[i].brain.predictJump(input)) {
                birds.population[i].vel = -10;
            }

            calculateScore(birds.population[i]);

            if (checkIfGameOver(birds.population[i], birds)) {
                birds.alive = birds.alive - 1;
                birds.population[i].dead = true;
            } 

            if (birds.population[i].score > bestScore) {
                bestScore = birds.population[i].score;
                bestScorerGen = generation;
                bestBird = i;
            }
        }
       
        if (birds.population[i].score >= pipeNumbers-5) {
            won = true;
        }
    }
    
    showGen.innerHTML = "Generation: " + generation;
    alive.innerHTML = "Alive: " + birds.alive;
    best_score.innerHTML = "Best Score: " + bestScore;
    best_scorer.innerHTML = "Best Generation: " + bestScorerGen;

    if(birds.alive == 0 || won) {
        finishGame = true;
        return;
    }

    setTimeout(function () {
        playGame(birds);
    }, 0);
}


function playWithBestBird() {

    
}




