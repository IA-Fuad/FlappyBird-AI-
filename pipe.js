class Pipe {
    constructor(pipeNumbers, pipeWidth, middleGap, sideGap, pipeHeight) {
        this.pipeNumbers = pipeNumbers;
        this.pipeWidth = pipeWidth;
        this.pipeHeight = pipeHeight;
        this.middleGap = middleGap;
        this.sideGap = sideGap;
        this.originalCopy = (pipeHeight == null) ? [] : pipeHeight;
        this.pipes = [];

        this.generate = function () {
            let firstPipeHeight;
            let gap = 0;

            for (let i = 0; i < pipeNumbers; i++) {
                if (this.pipeHeight == null) {
                    firstPipeHeight = generateRandom(100, canvas.height - 300);
                    this.originalCopy[i] = firstPipeHeight;
                }
                else {
                    firstPipeHeight = this.pipeHeight[i];
                }
                let ob = {
                    a: new Rectangle(
                        context,
                        canvas.width / 2 + gap,
                        0,
                        this.pipeWidth,
                        firstPipeHeight,
                        "black",
                        "green"
                    ),
                    b: new Rectangle(
                        context,
                        canvas.width / 2 + gap,
                        firstPipeHeight + this.middleGap,
                        this.pipeWidth,
                        canvas.height,
                        "black",
                        "green"
                    ),
                };
                this.pipes[i] = ob;
                gap = gap + this.pipeWidth + this.sideGap;
            }
        };

        this.draw = function (pipe) {
            pipe.a.draw();
            pipe.b.draw();
        };

        this.move = function (pipe, dx) {
            pipe.a.x += dx;
            pipe.b.x += dx;
        };
    }
}

