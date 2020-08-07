import * as curve from './index';
let canvas = document.createElement('canvas');
let cxt = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = 1000;
canvas.height = 1000;
document.body.append(canvas);

//format [M2,C6,C6,...];
let c0 = [0, 0, 50, 0, -50, 100, 100, 100, 260.039, 98.633, 142.820, 1.172, 223.500, 0.500];
let [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14] = c0;

function drawPointAtPath() {
    cxt.beginPath();
    cxt.moveTo(p1, p2)
    cxt.bezierCurveTo(p3, p4, p5, p6, p7, p8);
    cxt.bezierCurveTo(p9, p10, p11, p12, p13, p14);
    cxt.stroke();

    let p: any = curve.getPointAtLength(c0, curve.getTotalLength(c0) * 0.5);

    cxt.beginPath();
    cxt.arc(p.x, p.y, 2, 0, Math.PI * 2);
    cxt.fill();
}
function drawSubPathAtPath(i: number = 1) {
    cxt.translate(0, 100);
    let curvePoints = curve.getSubpathsAtLength(c0, i);
    for (let path of curvePoints) {
        if (path.length == 2) {
            cxt.beginPath();
            cxt.moveTo(path[0], path[1])
        } else {
            cxt.bezierCurveTo(path[0], path[1], path[2], path[3], path[4], path[5]);
            cxt.stroke();
        }
    }
}

function drawBezierCurve(i: number = 1) {
    cxt.beginPath();
    cxt.translate(0, 100);
    cxt.beginPath();
    let path = curve.bezierCurve(p1, p2, p3, p4, p5, p6, p7, p8, i);
    cxt.moveTo(path[0], path[1])
    cxt.bezierCurveTo(path[2], path[3], path[4], path[5], path[6], path[7]);
    cxt.stroke();
}
function drawQuadraticCurve(i: number = 1) {
    cxt.beginPath();
    cxt.translate(0, 100);
    cxt.beginPath();

    let path = curve.quadraticCurve(p1, p2, p3, p4, p7, p8, i);
    cxt.moveTo(path[0], path[1])
    cxt.bezierCurveTo(path[2], path[3], path[4], path[5], path[6], path[7]);
    cxt.stroke();
}
let i = 0;
function animateDrawBezierCurve() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.save();
    drawPointAtPath();

    drawSubPathAtPath(i);
    drawBezierCurve(i);
    drawQuadraticCurve(i);

    cxt.restore();

    i += 0.01;
    if (i > 1) {
        i = 0;
    }
    setTimeout(animateDrawBezierCurve, 33);
}
animateDrawBezierCurve();