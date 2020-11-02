// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var objectToString = Object.prototype.toString,
    Str = String,
    math = Math,
    E = "";


function rad(deg: number) {
    return deg % 360 * Math.PI / 180;
}
function deg(rad: number) {
    return rad * 180 / Math.PI % 360;
}
function matrix(): Matrix;
function matrix(a: Matrix): Matrix;
function matrix(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;
function matrix(a?: number | Matrix, b?: any, c?: any, d?: any, e?: any, f?: any): Matrix | null {
    if (a instanceof Matrix) {
        return new Matrix(a);
    } else if (a !== undefined) {
        return new Matrix(a, b, c, d, e, f);
    } else {
        return new Matrix();
    }
}
export default matrix;
type shorterType = {
    dx: number, dy: number, scalex: number, scaley: number, rotate: number, shear: number, isSimple: boolean, isSuperSimple
    : boolean, noRotation: boolean
}
export class Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    constructor()
    constructor(a: Matrix)
    constructor(a: number, b: number, c: number, d: number, e: number, f: number)
    constructor(a?: number | Matrix, b?: any, c?: any, d?: any, e?: any, f?: any) {
        if (b == null && a instanceof Matrix) {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
            this.d = a.d;
            this.e = a.e;
            this.f = a.f;
        }
        if (a !== undefined) {
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.d = +d;
            this.e = +e;
            this.f = +f;
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }

    /*\
     * Matrix.add
     [ method ]
     **
     * Adds the given matrix to existing one
     - a (number)
     - b (number)
     - c (number)
     - d (number)
     - e (number)
     - f (number)
     * or
     - matrix (object) @Matrix
    \*/
    add(a: number | Matrix, b: number, c: number, d: number, e: number, f: number): Matrix {
        if (a && a instanceof Matrix) {
            return this.add(a.a, a.b, a.c, a.d, a.e, a.f);
        } else if (typeof a == 'number') {
            var aNew: number = a * this.a + b * this.c,
                bNew: number = a * this.b + b * this.d;
            this.e += e * this.a + f * this.c;
            this.f += e * this.b + f * this.d;
            this.c = c * this.a + d * this.c;
            this.d = c * this.b + d * this.d;

            this.a = aNew;
            this.b = bNew;
        }
        return this;
    };
    /*\
     * Matrix.multLeft
     [ method ]
     **
     * Multiplies a passed affine transform to the left: M * this.
     - a (number)
     - b (number)
     - c (number)
     - d (number)
     - e (number)
     - f (number)
     * or
     - matrix (object) @Matrix
    \*/
    multLeft(a: number | Matrix, b: number, c: number, d: number, e: number, f: number): Matrix {
        if (a && a instanceof Matrix) {
            return this.multLeft(a.a, a.b, a.c, a.d, a.e, a.f);
        } else if (typeof a == 'number') {
            var aNew = a * this.a + c * this.b,
                cNew = a * this.c + c * this.d,
                eNew = a * this.e + c * this.f + e;
            this.b = b * this.a + d * this.b;
            this.d = b * this.c + d * this.d;
            this.f = b * this.e + d * this.f + f;

            this.a = aNew;
            this.c = cNew;
            this.e = eNew;
        }
        return this;
    };
    /*\
     * Matrix.invert
     [ method ]
     **
     * Returns an inverted version of the matrix
     = (object) @Matrix
    \*/
    invert() {
        var me = this,
            x = me.a * me.d - me.b * me.c;
        return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
    };
    /*\
     * Matrix.clone
     [ method ]
     **
     * Returns a copy of the matrix
     = (object) @Matrix
    \*/
    clone() {
        return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    /*\
     * Matrix.translate
     [ method ]
     **
     * Translate the matrix
     - x (number) horizontal offset distance
     - y (number) vertical offset distance
    \*/
    translate(x: number, y: number) {
        this.e += x * this.a + y * this.c;
        this.f += x * this.b + y * this.d;
        return this;
    };
    /*\
     * Matrix.scale
     [ method ]
     **
     * Scales the matrix
     - x (number) amount to be scaled, with `1` resulting in no change
     - y (number) #optional amount to scale along the vertical axis. (Otherwise `x` applies to both axes.)
     - cx (number) #optional horizontal origin point from which to scale
     - cy (number) #optional vertical origin point from which to scale
     * Default cx, cy is the middle point of the element.
    \*/
    scale(x: number, y: number, cx: number, cy: number) {
        y == null && (y = x);
        (cx || cy) && this.translate(cx, cy);
        this.a *= x;
        this.b *= x;
        this.c *= y;
        this.d *= y;
        (cx || cy) && this.translate(-cx, -cy);
        return this;
    };


    /*\
     * Matrix.rotate
     [ method ]
     **
     * Rotates the matrix
     - a (number) angle of rotation, in degrees
     - x (number) horizontal origin point from which to rotate
     - y (number) vertical origin point from which to rotate
    \*/
    rotate(a: number, x: number = 0, y: number = 0) {
        a = rad(a);
        x = x || 0;
        y = y || 0;
        var cos = +math.cos(a).toFixed(9),
            sin = +math.sin(a).toFixed(9);
        this.add(cos, sin, -sin, cos, x, y);
        return this.add(1, 0, 0, 1, -x, -y);
    };
    /*\
     * Matrix.skewX
     [ method ]
     **
     * Skews the matrix along the x-axis
     - x (number) Angle to skew along the x-axis (in degrees).
    \*/
    skewX(x: number) {
        return this.skew(x, 0);
    };
    /*\
     * Matrix.skewY
     [ method ]
     **
     * Skews the matrix along the y-axis
     - y (number) Angle to skew along the y-axis (in degrees).
    \*/
    skewY(y: number) {
        return this.skew(0, y);
    };
    /*\
     * Matrix.skew
     [ method ]
     **
     * Skews the matrix
     - y (number) Angle to skew along the y-axis (in degrees).
     - x (number) Angle to skew along the x-axis (in degrees).
    \*/
    skew(x: number, y: number) {
        x = x || 0;
        y = y || 0;
        x = rad(x);
        y = rad(y);
        var c = parseFloat(math.tan(x).toFixed(9));
        var b = parseFloat(math.tan(y).toFixed(9));
        return this.add(1, b, c, 1, 0, 0);
    };
    /*\
     * Matrix.x
     [ method ]
     **
     * Returns x coordinate for given point after transformation described by the matrix. See also @Matrix.y
     - x (number)
     - y (number)
     = (number) x
    \*/
    x(x: number, y: number) {
        return x * this.a + y * this.c + this.e;
    };
    /*\
     * Matrix.y
     [ method ]
     **
     * Returns y coordinate for given point after transformation described by the matrix. See also @Matrix.x
     - x (number)
     - y (number)
     = (number) y
    \*/
    y(x: number, y: number) {
        return x * this.b + y * this.d + this.f;
    };
    get = function (i: number) {
        return +this[Str.fromCharCode(97 + i)].toFixed(4);
    };
    toString() {
        return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")";
    };
    offset() {
        return [this.e.toFixed(4), this.f.toFixed(4)];
    };
    norm(a: number[]) {
        return a[0] * a[0] + a[1] * a[1];
    }
    normalize(a: number[]) {
        var mag = math.sqrt(this.norm(a));
        a[0] && (a[0] /= mag);
        a[1] && (a[1] /= mag);
    }
    /*\
     * Matrix.determinant
     [ method ]
     **
     * Finds determinant of the given matrix.
     = (number) determinant
    \*/
    determinant() {
        return this.a * this.d - this.b * this.c;
    };
    /*\
     * Matrix.split
     [ method ]
     **
     * Splits matrix into primitive transformations
     = (object) in format:
     o dx (number) translation by x
     o dy (number) translation by y
     o scalex (number) scale by x
     o scaley (number) scale by y
     o shear (number) shear
     o rotate (number) rotation in deg
     o isSimple (boolean) could it be represented via simple transformations
    \*/
    split() {
        var out = <shorterType>{};
        // translation
        out.dx = this.e;
        out.dy = this.f;

        // scale and shear
        var row = [[this.a, this.b], [this.c, this.d]];
        out.scalex = math.sqrt(this.norm(row[0]));
        this.normalize(row[0]);

        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
        row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

        out.scaley = math.sqrt(this.norm(row[1]));
        this.normalize(row[1]);
        out.shear /= out.scaley;

        if (this.determinant() < 0) {
            out.scalex = -out.scalex;
        }

        // rotation
        var sin = row[0][1],
            cos = row[1][1];
        if (cos < 0) {
            out.rotate = deg(math.acos(cos));
            if (sin < 0) {
                out.rotate = 360 - out.rotate;
            }
        } else {
            out.rotate = deg(math.asin(sin));
        }

        out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
        out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
        out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
        return out;
    };
    /*\
     * Matrix.toTransformString
     [ method ]
     **
     * Returns transform string that represents given matrix
     = (string) transform string
    \*/
    toTransformString(shorter?: shorterType) {
        var s = shorter || this.split();
        if (!+s.shear.toFixed(9)) {
            s.scalex = +s.scalex.toFixed(4);
            s.scaley = +s.scaley.toFixed(4);
            s.rotate = +s.rotate.toFixed(4);
            return (s.dx || s.dy ? "t" + [+s.dx.toFixed(4), +s.dy.toFixed(4)] : E) +
                (s.rotate ? "r" + [+s.rotate.toFixed(4), 0, 0] : E) +
                (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E);
        } else {
            return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
        }
    }

}