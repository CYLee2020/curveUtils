const curve = require('../dist/path');

const matrix = require('../dist/matrix');

test('path.js', () => {
    expect(curve.getTotalLength("M0,0,L100,0")).toBeCloseTo(100)
    expect(curve.getPointAtLength("M0,0,C100,0,100,100,0,100", 50)).toEqual({
        x: 48.35260100662708,
        y: 10.589365612167967,
        m: { x: 36.314066872000694, y: 4.078999534249306 },
        n: { x: 95.9210004657507, y: 36.314066872000694 },
        start: { x: 20.196533203125, y: 0 },
        end: { x: 79.803466796875, y: 100 },
        alpha: 208.40425318690296
    })
    expect(curve.getSubpathsAtLength([['M', 0, 0], ['C', 0, 0, 100, 0, 100, 0]], curve.getTotalLength([['M', 0, 0], ['C', 0, 0, 100, 0, 100, 0]]) / 2, false)).toEqual({ start: 'M0,0C0,0,25,0,50,0', end: 'M50,0C75,0,100,0,100,0' });
    expect(curve.getSubpathsAtLength("M0,0,C100,0,100,100,0,100", curve.getTotalLength("M0,0,C100,0,100,100,0,100") / 2, true)).toBe('M0,0C50,0,75,25,75,50');

    expect(curve.path2curve("M0,0,L100,0")).toEqual(
        expect.arrayContaining([['M', 0, 0], ['C', 0, 0, 100, 0, 100, 0]]),
    );

    expect(curve.path2curve("M0,0,Q50,50,100,0")).toEqual(
        expect.arrayContaining([
            ['M', 0, 0],
            [
                'C',
                33.33333333333333,
                33.33333333333333,
                66.66666666666666,
                33.33333333333333,
                100,
                0
            ],

        ])
    )
    expect(curve.path2curve("M0,0,L100,0")).toEqual(
        expect.arrayContaining([['M', 0, 0], ['C', 0, 0, 100, 0, 100, 0]]),
    );

    let mat = matrix.default();
    mat.translate(100, 0);
    expect(curve.matrixPath("M0,0,L100,0", mat)).toEqual(
        expect.arrayContaining([
            ['M', 100, 0],
            [
                'C', 100, 0, 200,
                0, 200, 0
            ]
        ]),
    );

});
