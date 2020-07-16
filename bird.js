class Bird {
    constructor(x, y, width, height, radius) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.radius = radius;
        this.bird = new Rectangle(context, x, y, width, height);
        this.brain = new NeuralNetwork(
            nnInputUnit,
            nnMiddleLayerUnit,
            nnOutputUnit
        );
        this.vel = 0;
        this.score = 0;
        this.distanceTraveled = 0;
        this.passed = -1;
        this.dead = false;

        this.draw = function () {
            let r = generateRandom(0, 255);
            let g = generateRandom(0, 255);
            let b = generateRandom(0, 255);
            let strokeColor = `rgb(${r}, ${g}, ${b})`;
            let fillColor = `rgb(${r}, ${g}, ${b})`;
            new Circle(
                context,
                this.bird.x + this.radius,
                this.bird.y + this.radius,
                this.radius,
                strokeColor,
                fillColor,
                this.score,
                "black",
                12
            ).draw();
        };
    }
}

