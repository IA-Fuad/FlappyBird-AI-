function Pipe(pipeNumbers, pipeWidth, middleGap, sideGap) {
    this.pipeNumbers = pipeNumbers;
    this.pipeWidth = pipeWidth;
    this.middleGap = middleGap;
    this.sideGap = sideGap;
    this.originalCopy = [];

    this.generate = function () {
        let pipes = [];
        let firstPipeHeight;
        let gap = 0;

        for (let i = 0; i < pipeNumbers; i++) {
            firstPipeHeight = generateRandom(100, canvas.height - 300);
            let ob = {
                a: new Rectangle(
                    context,
                    canvas.width + gap,
                    0,
                    this.pipeWidth,
                    firstPipeHeight,
                    "black",
                    "green"
                ),
                b: new Rectangle(
                    context,
                    canvas.width + gap,
                    firstPipeHeight + this.middleGap,
                    this.pipeWidth,
                    canvas.height,
                    "black",
                    "green"
                ),
            };
            pipes[i] = ob;
            originalCopy.push(ob);
            gap = gap + pipeWidth + sideGap;
        }
        
        return pipes;
    }

    this.draw = function (pipe) {
        pipe.a.draw();
        pipe.b.draw();
    }
}