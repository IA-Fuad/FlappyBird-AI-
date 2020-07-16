function NeuralNetwork(inputUnit, middleLayerUnit, outputUnit) {
    this.inputUnit = inputUnit;
    this.middleLayerUnit = middleLayerUnit;
    this.outputUnit = outputUnit;
    this.firstWeights = [];
    this.secondWeights = [];

    this.generateRandomWeights = function () {
        for (let i = 0; i < this.middleLayerUnit; i++) {
            let x = [];
            for (let j = 0; j < this.inputUnit; j++) {
                x.push(generateRandom(-1, 1));
            }
            this.firstWeights.push(x);
        }

        for (let i = 0; i < this.outputUnit; i++) {
            let x = [];
            for (let j = 0; j < this.middleLayerUnit; j++) {
                x.push(generateRandom(-1, 1));
            }
            this.secondWeights.push(x);
        }
    }

    this.predictJump = function (inputs) {
        let a1 = matrixVectorMultiplication(this.firstWeights, inputs);
        a1 = sigmoiActivation(a1);
        let output = matrixVectorMultiplication(this.secondWeights, a1);
        output = sigmoiActivation(output);
        if (output[0] >= 0.5) {
            return true;
        }
        return false;
    }
}

function matrixVectorMultiplication(a, b) {
    let ans = [];
    for (let i = 0; i < a.length; i++) {
        ans[i] = 0;
    }
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
            ans[i] += (a[i][j] * b[j]);
        }
    }
    return ans;
}

function sigmoiActivation(output) {
    for (let i = 0; i < output.length; i++) {
        output[i] = 1 / (1 + Math.exp(-output[i]));
    }
    return output;
}