const curve = require('../dist/index');
let c0 = [0, 0, 50, 0, -50, 100, 100, 100, 260.039, 98.633, 142.820, 1.172, 223.500, 0.500];
let [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14] = c0;
test('getTotalLength', () => {
    expect(curve.getTotalLength(c0)).toBe(362.8280594440472);
});

test('getPointAtLength', () => {
    expect(curve.getPointAtLength(c0, 362.8280594440472 / 2)).toEqual(
        { "x": 107.21732741448217, "y": 99.86864156487827, "m": { "x": 104.87649796357006, "y": 99.93486804360896 }, "n": { "x": 256.46602256334944, "y": 95.64611457513645 }, "start": { "x": 102.47130535888672, "y": 99.97889093017578 }, "end": { "x": 144.06585205078125, "y": 1.161623046875 }, "alpha": 178.37942666142737 }
    );
});
test('getSubpathsAtLength', () => {
    expect(curve.getSubpathsAtLength(c0, 0.75)).toEqual([
        [0, 0],
        [50, 0, -50, 100, 100, 100],
        [159.057, 99.496, 180.359, 85.906, 187.783, 68.923]
    ]);
});

test('bezierCurve', () => {
    expect(curve.bezierCurve(p1, p2, p3, p4, p5, p6, p7, p8, 1)).toEqual([
        0, 0, 50, 0,
        -50, 100, 100, 100
    ]);
});
test('quadraticCurve', () => {
    expect(curve.quadraticCurve(p1, p2, p3, p4, p7, p8, 0.5)).toEqual([
        0, 0,
        20.357, 0,
        40.715, 12.433,
        61.072, 37.298
    ]);
});