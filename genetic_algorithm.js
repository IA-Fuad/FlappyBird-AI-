function Population(N, pop) {
    this.N = N;
    this.population = (pop == null) ? [] : pop;
    this.fitness = [];
    this.bestFit = 0;
    this.bestScore = 0;
    this.totalScore = 0;
    this.alive = N;

    this.generateNewPopulation = function () {
        for (let i = 0; i < this.N; i++) {
            this.population[i] = new Bird(birdInitX, birdInitY, birdWidth, birdHeight, birdRadius);
            this.population[i].brain.generateRandomWeights();
        }
    }

    this.calculateFitness = function () {
        for (let i = 0; i < this.N; i++) {
            let score =
                this.population[i].distanceTraveled *
                this.population[i].distanceTraveled *
                this.population[i].distanceTraveled;
            this.fitness.push(score);

            if (score > this.bestScore) {
                this.bestScore = score;
                this.bestFit = i;
            }
            this.totalScore += score;
        }
    }

    this.crossOver = function () {
        let newPopulation = [], s = 0;
    
        for (let i = s; i < this.N; i++) {
            if (i % 10 == 0) {
                let a = chooseParent(this.fitness, this.totalScore);
                newPopulation[i] = new Bird(birdInitX, birdInitY, birdWidth, birdHeight, birdRadius);
                newPopulation[i].brain = this.population[a].brain;
                continue;
            }

            let a = chooseParent(this.fitness, this.totalScore);
            let b = chooseParent(this.fitness, this.totalScore);

            let aw1 = this.population[a].brain.firstWeights;
            let aw2 = this.population[a].brain.secondWeights;
            let bw1 = this.population[b].brain.firstWeights;
            let bw2 = this.population[b].brain.secondWeights;
            let childw1 = [], childw2 = [];

            for (let j = 0; j < aw1.length; j++) {
                let x = [];
                let r = Math.random(), rem = 0;
                if (r < 0.5) {
                    rem = 1;
                }
                for (let k = 0; k < aw1[j].length; k++) {
                    let cross;
                    if (k % 2 == rem) {
                        cross = aw1[j][k];
                    }
                    else {
                        cross = bw1[j][k];
                    }
                    x.push(cross);
                }
                childw1.push(x);
            }

            for (let j = 0; j < aw2.length; j++) {
                let x = [];
                let r = Math.random(), rem = 0;
                if (r < 0.5) {
                    rem = 1;
                }
                for (let k = 0; k < aw2[j].length; k++) {
                    let cross;
                    if (k % 2 == rem) {
                        cross = aw2[j][k];
                    } 
                    else {
                        cross = bw2[j][k];
                    }
                    x.push(cross);
                }
                childw2.push(x);
            }

            newPopulation[i] = new Bird(birdInitX, birdInitY, birdWidth, birdHeight, birdRadius);
            newPopulation[i].brain.firstWeights = childw1;
            newPopulation[i].brain.secondWeights = childw2;
        }

        return newPopulation;
    }

    this.mutation = function (mutationRate, newPopulation) {
        for (let i = 0; i < newPopulation.length; i++) {
            let r = Math.random();
            if (r < mutationRate) {
                let w1 = newPopulation[i].brain.firstWeights;
                let w2 = newPopulation[i].brain.secondWeights;

                for (let j = 0; j < w1.length; j++) {
                    for (let k = 0; k < w1[j].length; k++) {
                        let r = Math.random();
                        if (r >= 0.5) {
                            w1[j][k] *= 0.1;
                        }
                    }
                }
                
                for(let j = 0; j < w2.length; j++) {
                    for (let k = 0; k < w2[j]; k++) {
                        let r = Math.random();
                        if (r >= 0.5) {
                            w2[j][k] *= 0.1;
                        }
                    }
                }

                newPopulation[i].firstWeights = w1;
                newPopulation[i].secondWeights = w2;
            }
        }

        return newPopulation;
    }
}

function chooseParent(parents, range) {
    let x = Math.random(), sum = 0;
    for (let i = 0; i < parents.length; i++) {
        sum += (parents[i] / range);
        if (x <= sum) {
            return i;
        }
    }
}