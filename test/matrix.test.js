const matrix = require('../dist/matrix');
test('path.js', () => {

    let a = matrix.default();
    a.translate(100, 0);

    expect(a.toString()).toBe('matrix(1,0,0,1,100,0)');

    a.rotate(90)
    expect(a.toString()).toBe('matrix(0,1,-1,0,100,0)');
});
