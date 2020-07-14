const circleLength = Math.PI * 2;

// function DrawShapes(context, x, y) {
//     this.context = context;
//     this.x = x;
//     this.y = y;

//     this.drawCircle = function (radius, strokeColor, fillColor, text, textColor, textSize) {
//         //console.log(this.x, this.y);
//         this.context.beginPath();
//         this.context.arc(this.x, this.y, radius, 0, circleLength, true);
//         this.context.strokeStyle = strokeColor;
//         this.context.textAlign = "center";
//         this.context.lineWidth = 1;
//         if (fillColor != null) {
//             this.context.fillStyle = fillColor;
//             this.context.fill();
//         }
//         this.context.save();
//         this.context.fillStyle = textColor;
//         if (textSize == null) {
//             textSize = 1;
//         }
//         this.context.font = textSize + "px Arial";
//         this.context.textBaseline = "middle";
//         this.context.fillText(text == null ? "" : text, this.x, this.y);
//         this.context.restore();
//         this.context.stroke();
//     }

//     this.drawLine = function (x1, y1, x2, y2, lineColor, lineWidth) {
//         this.context.beginPath();
//         this.context.moveTo(x1, y1);
//         this.context.lineTo(x2, y2);
//         this.context.strokeStyle = lineColor;
//         this.context.lineWidth = lineWidth;
//         this.context.stroke();
//     }

//     this.drawRectangle = function(width, height, strokeColor, fillColor) {
//         this.context.beginPath();
//         this.context.stokeStyle = strokeColor;
//         this.context.strokeRect(this.x, this.y, width, height);
//         if (fillColor != null) {
//             this.context.fillStyle = fillColor;
//             this.context.fillRect(this.x, this.y, width, height);
//         }
//     }

//     this.drawText = function(text, textColor, alignment, fontSize) {
//         this.context.beginPath();
//         if (fontSize != null) {
//             this.context.font = fontSize + "px Arial";
//         }
//         this.context.fillStyle = textColor;
//         this.context.textAlign = alignment;
//         this.context.fillText(text, this.x, this.y);
//     }
// }

function Circle(context, x, y, radius, strokeColor, fillColor, text, textColor, textSize) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.text = text;
    this.textColor = textColor;
    this.textSize = textSize;

    this.draw = function () {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, circleLength, true);
        this.context.strokeStyle = this.strokeColor;
        this.context.textAlign = "center";
        this.context.lineWidth = 1;
        if (this.fillColor != null) {
            this.context.fillStyle = this.fillColor;
            this.context.fill();
        }
        this.context.save();
        this.context.fillStyle = this.textColor;
        if (this.textSize == null) {
            this.textSize = 1;
        }
        this.context.font = this.textSize + "px Arial";
        this.context.textBaseline = "middle";
        this.context.fillText(
            this.text == null ? "" : this.text,
            this.x,
            this.y
        );
        this.context.restore();
        this.context.stroke();
    }
}

function Rectangle(context, x, y, width, height, strokeColor, fillColor) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;

    this.draw = function () {
        this.context.beginPath();
        this.context.stokeStyle = strokeColor;
        this.context.strokeRect(this.x, this.y, this.width, this.height);
        if (fillColor != null) {
            this.context.fillStyle = this.fillColor;
            this.context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function Line(x1, y1, x2, y2, lineColor, lineWidth) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;

    this.draw = function () {
        this.context.beginPath();
        this.context.moveTo(this.x1, this.y1);
        this.context.lineTo(this.x2, this.y2);
        this.context.strokeStyle = this.lineColor;
        this.context.lineWidth = this.lineWidth;
        this.context.stroke();
    }
}


function generateRandom(a, b) {
    let r = Math.random() * Math.abs(b);
    if (a === -b) {
        if (Math.random() > 0.5) {
            r = -r;
        }
    }
    else {
        r += a;
    }
    return r;
}

function randomNode(x, y, r) {
    let angle = generateRandom(0, Math.PI);
    angle = Math.random() > 0.5 ? -angle : angle;
    return [x + r * Math.cos(angle), y + r * Math.sin(angle)];
}

function getDistance(x1, y1, x2, y2) {
    let disX = x1 - x2;
    let disY = y1 - y2;
    let dis = (disX * disX) + (disY * disY);
    dis = Math.sqrt(dis);
    //return Math.hypot(disX, disY);
    return dis;
}

function drawEllipse(context) {
    let cx = 300,
        cy = 300,
        rx = 100,
        ry = 40;

    context.save(); // save state
    context.beginPath();

    context.translate(cx - rx, cy - ry);
    context.scale(rx, ry);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);

    context.restore(); // restore to original state
    context.stroke();

    let ctx = context;
    ctx.beginPath();
    ctx.ellipse(300, 300, 90, 75, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
}


function clearCanvas(context) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x:
            ((evt.clientX - rect.left) / (rect.right - rect.left)) *
            canvas.width,
        y:
            ((evt.clientY - rect.top) / (rect.bottom - rect.top)) *
            canvas.height,
    };
}