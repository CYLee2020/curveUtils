
interface Point {
    x: number,
    y: number
}


function PointOnCubicBezier(cp: Point[], t: number) {
    var F = {} as Point, G = {} as Point, H = {} as Point, I = {} as Point, J = {} as Point;
    F.x = cp[0].x * (1 - t) + cp[1].x * t;
    F.y = cp[0].y * (1 - t) + cp[1].y * t;
    G.x = cp[1].x * (1 - t) + cp[2].x * t;
    G.y = cp[1].y * (1 - t) + cp[2].y * t;
    H.x = cp[2].x * (1 - t) + cp[3].x * t;
    H.y = cp[2].y * (1 - t) + cp[3].y * t;

    I.x = F.x * (1 - t) + G.x * t;
    I.y = F.y * (1 - t) + G.y * t;

    J.x = G.x * (1 - t) + H.x * t;
    J.y = G.y * (1 - t) + H.y * t;

    return { x: I.x * (1 - t) + J.x * t, y: I.y * (1 - t) + J.y * t };
}
function PointOnCubicBezier2(cp: Point[], t: number) {

    var F = {} as Point, G = {} as Point, H = {} as Point, I = {} as Point, J = {} as Point;
    F.x = cp[0].x * (1 - t) + cp[1].x * t * 2;
    F.y = cp[0].y * (1 - t) + cp[1].y * t * 2;
    G.x = t * t * cp[2].x;
    G.y = t * t * cp[2].y;

    return { x: F.x * (1 - t) + G.x, y: F.y * (1 - t) + G.y };
}

function base3(t: number, p1: number, p2: number, p3: number, p4: number) {
    var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
        t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
    return t * t2 - 3 * p1 + 3 * p2;
}
function bezlen(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, z?: number) {
    if (z == null) {
        z = 1;
    }
    z = z > 1 ? 1 : z < 0 ? 0 : z;
    var z2 = z / 2,
        n = 12,
        Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816],
        Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
        sum = 0;
    for (var i = 0; i < n; i++) {
        var ct = z2 * Tvalues[i] + z2,
            xbase = base3(ct, x1, x2, x3, x4),
            ybase = base3(ct, y1, y2, y3, y4),
            comb = xbase * xbase + ybase * ybase;
        sum += Cvalues[i] * Math.sqrt(comb);
    }
    return z2 * sum;
}
function findDotsAtSegment(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number, t: number) {
    var t1 = 1 - t,
        t13 = Math.pow(t1, 3),
        t12 = Math.pow(t1, 2),
        t2 = t * t,
        t3 = t2 * t,
        x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
        y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
        mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
        my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
        nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
        ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
        ax = t1 * p1x + t * c1x,
        ay = t1 * p1y + t * c1y,
        cx = t1 * c2x + t * p2x,
        cy = t1 * c2y + t * p2y,
        alpha = 90 - Math.atan2(mx - nx, my - ny) * 180 / Math.PI;
    // (mx > nx || my < ny) && (alpha += 180);
    return {
        x: x,
        y: y,
        m: { x: mx, y: my },
        n: { x: nx, y: ny },
        start: { x: ax, y: ay },
        end: { x: cx, y: cy },
        alpha: alpha
    };
}
function getPointAtSegmentLength(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number, length?: number) {
    if (length == null) {
        return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
    } else {
        return findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y,
            getTotLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
    }
}


function q2c(x1: number, y1: number, ax: number, ay: number, x2: number, y2: number) {
    var _13 = 1 / 3,
        _23 = 2 / 3;
    return [
        _13 * x1 + _23 * ax,
        _13 * y1 + _23 * ay,
        _13 * x2 + _23 * ax,
        _13 * y2 + _23 * ay,
        x2,
        y2
    ];
}
function O(val: number) {
    return +(+val).toFixed(3);
}
function getTotLen(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, ll: number): number {
    if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
        return 0;
    }
    var t = 1,
        step = t / 2,
        t2 = t - step,
        l,
        e = .01;
    l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
    while (Math.abs(l - ll) > e) {
        step /= 2;
        t2 += (l < ll ? 1 : -1) * step;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
    }
    return t2;
}

function forMathPathArgs(args: number[]) {

    let path = [args.slice(0, 2), args.slice(2, 8)];
    let other = args.slice(8);

    if (other && other.length % 6 == 0) {
        let start = 0;
        while (start < other.length) {
            path.push(other.slice(start, start + 6))
            start += 6;
        }
    }
    return path
}
export function getPointAtLength(pathArr: number[], length: number): { x: number, y: number } {

    let path = forMathPathArgs(pathArr);

    var x = 0, y = 0, p: any, l = 0, len = 0;
    for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i];
        if (p.length == 2) {
            x = +p[0];
            y = +p[1];
        } else {
            l = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5]) as number;
            if (len + l > length) {
                let point = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5], length - len);
                return point as { x: number, y: number };

            }
            len += l;
            x = +p[4];
            y = +p[5];
        }

    }
    let point = findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1)
    return point;

}
export function getTotalLength(pathArr: number[]) {

    let path = forMathPathArgs(pathArr);
    var x = 0, y = 0, p, l = 0, len = 0;
    for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i];
        if (p.length == 2) {
            x = +p[0];
            y = +p[1];
        } else {
            l = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5]) as number;
            len += l;
            x = +p[4];
            y = +p[5];
        }
    }
    return len;

}


export interface CurvePoint {
    x: number,
    y: number,
    m: { x: number, y: number },
    n: { x: number, y: number },
    start: { x: number, y: number },
    end: { x: number, y: number },
    alpha: number
};

export function getSubpathsAtLength(pathArr: number[], ratio: number = 1): number[][] {


    let path = forMathPathArgs(pathArr);
    let length = getTotalLength(pathArr) * ratio;
    let x = 0, y = 0, p = [], l = 0, sp: number[][] = [], point: CurvePoint,
        len = 0;
    for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i] as number[];
        if (p.length == 2) {
            x = +p[0];
            y = +p[1];
        } else {
            l = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5]) as number;
            if (len + l > length) {
                point = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5], length - len) as CurvePoint;
                sp.push([
                    O(point.start.x),
                    O(point.start.y),
                    O(point.m.x),
                    O(point.m.y),
                    O(point.x),
                    O(point.y)
                ]);
                break;

            }
            len += l;
            x = +p[4];
            y = +p[5];
        }

        sp.push(p);
    }
    return sp;

}
export function bezierCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, t: number = 1) {
    let c = [x1, y1, x2, y2, x3, y3, x4, y4];
    let curvePoints = getSubpathsAtLength(c, t);
    return curvePoints.reduce(function (a, b) { return a.concat(b) })
}

export function quadraticCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, t: number = 1) {
    let [c1x, c1y, c2x, c2y, x4, y4] = q2c(x1, y1, x2, y2, x3, y3);
    return bezierCurve(x1, y1, c1x, c1y, c2x, c2y, x4, y4, t);
}
