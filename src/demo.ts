import * as curve from './path';


import matrix from './matrix';

let canvas = document.createElement('canvas');
let cxt = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = 1000;
canvas.height = 1000;
document.body.append(canvas);

//format [M2,C6,C6,...];
let c0 = "M0 0C50 0 -50 100 100 100";

function drawSubPathAtPath(i: number = 1) {
    cxt.translate(100, 100);
    let length = curve.getTotalLength(c0);
    let curvePoints = curve.getSubpathsAtLength(c0, i * length).start;
    for (let path of curve.path2curve(curvePoints)) {
        if (path[0] == "M") {
            cxt.beginPath();
            cxt.moveTo(path[1], path[2])
        } else {
            cxt.bezierCurveTo(path[1], path[2], path[3], path[4], path[5], path[6]);
            cxt.stroke();
        }
    }
}

function drawMatrixPath(i: number = 1) {
    cxt.translate(200, 200);
    let length = curve.getTotalLength(c0);
    let mat = matrix();
    mat.rotate(90);
    let newC0 = curve.matrixPath(c0, mat);
    let curvePoints = curve.getSubpathsAtLength(newC0, i * length).start;
    for (let path of curve.path2curve(curvePoints)) {
        if (path[0] == "M") {
            cxt.beginPath();
            cxt.moveTo(path[1], path[2])
        } else {
            cxt.bezierCurveTo(path[1], path[2], path[3], path[4], path[5], path[6]);
            cxt.stroke();
        }
    }
}


let i = 0;
function animateDrawBezierCurve() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    cxt.save();

    drawSubPathAtPath(i);
    drawMatrixPath(i)

    cxt.restore();

    i += 0.01;
    if (i > 1) {
        i = 0;
    }
    setTimeout(animateDrawBezierCurve, 33);
}
animateDrawBezierCurve();