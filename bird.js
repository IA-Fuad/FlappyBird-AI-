function Bird(x, y, height, width, radius) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.radius = radius;
    this.bird = new Rectangle(context, x, y, width, height, "green", "yellow");
    this.brain = new NeuralNetwork(3, 4, 1);
    this.vel = 0;
    this.score = 0;
    this.distanceTraveled = 0;
    this.passed = -1;
    this.dead = false;

    this.reset = function () {
        this.bird = new Rectangle(context, this.x, this.y, this.width, this.height, "green", "yellow");
        this.vel = 0;
        this.score = 0;
        this.distanceTraveled = 0;
        this.passed = -1;
        this.dead = false;
    };

    this.draw = function () {
        new Circle(
            context,
            this.bird.x + this.radius,
            this.bird.y + this.radius,
            radius,
            "red",
            "yellow",
            this.score,
            "black",
            12
        ).draw();
    }
}
