function Population(N, population) {
    this.N = N;
    this.population = (population == null) ? [] : population;
    this.fitness = [];
    this.bestFit = 0;
    this.bestScore = 0;
    this.totalScore = 0;

    this.reset = function () {
        this.fitness = [];
        this.bestFit = 0;
        this.bestScore = 0;
        this.totalScore = 0;
    }

    this.generateNewPopulation = function () {
        for (let i = 0; i < this.N; i++) {
            this.population[i] = new Bird();
            this.population[i].brain.generateRandomWeights();
        }
    }

    this.calculateFitness = function () {
        for (let i = 0; i < this.N; i++) {
            //console.log(this.population[i])
            //console.log(this.population[i].score);
            let score =
                this.population[i].distanceTraveled *
                this.population[i].distanceTraveled *
                this.population[i].distanceTraveled;
            this.fitness.push(score);
            //console.log('score', score)
            if (score > this.bestScore) {
                this.bestScore = score;
                this.bestFit = i;
            }
            this.totalScore += score;
        }
    }

    this.crossOver = function () {
        let newPopulation = [], s = 0;
        newPopulation[this.bestFit] = this.population[this.bestFit];
        if (this.bestFit == 0) {
            newPopulation[1] = this.population[this.bestFit];
            s = 2;
        }
        else {
            newPopulation[0] = this.population[this.bestFit];
            s = 1;
        }

        for (let i = s; i < this.N; i++) {
            if (i == this.bestFit) {
                continue;
            }
            if (i % 2 == 0) {
                let a = chooseParent(this.fitness, this.totalScore);
                newPopulation[i] = new Bird();
                newPopulation[i].brain = this.population[a].brain;
                continue;
            }

            let a = chooseParent(this.fitness, this.totalScore);
            let b = chooseParent(this.fitness, this.totalScore);

            //console.log(a, b)

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

            newPopulation[i] = new Bird();
            newPopulation[i].brain.firstWeights = childw1;
            newPopulation[i].brain.secondWeights = childw2;
        }

        this.population = newPopulation;
        //return newPopulation;
    }

    this.mutation = function (mutationRate) {
        for (let i = 0; i < this.population.length; i++) {
            if (i == this.bestFit) {
                continue;
            }
            let r = Math.random();
            if (r < mutationRate || i == 0 || i == 1) {
                //console.log('mutating')
                let w1 = this.population[i].brain.firstWeights;
                let w2 = this.population[i].brain.secondWeights;

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

                this.population[i].firstWeights = w1;
                this.population[i].secondWeights = w2;
            }
        }

        //return population;
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