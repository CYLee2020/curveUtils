"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectToString = Object.prototype.toString, Str = String, math = Math, E = "";
function rad(deg) {
    return deg % 360 * Math.PI / 180;
}
function deg(rad) {
    return rad * 180 / Math.PI % 360;
}
function matrix(a, b, c, d, e, f) {
    if (a instanceof Matrix) {
        return new Matrix(a);
    }
    else if (a !== undefined) {
        return new Matrix(a, b, c, d, e, f);
    }
    else {
        return new Matrix();
    }
}
exports.default = matrix;
var Matrix = (function () {
    function Matrix(a, b, c, d, e, f) {
        this.get = function (i) {
            return +this[Str.fromCharCode(97 + i)].toFixed(4);
        };
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
        }
        else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }
    Matrix.prototype.add = function (a, b, c, d, e, f) {
        if (a && a instanceof Matrix) {
            return this.add(a.a, a.b, a.c, a.d, a.e, a.f);
        }
        else if (typeof a == 'number') {
            var aNew = a * this.a + b * this.c, bNew = a * this.b + b * this.d;
            this.e += e * this.a + f * this.c;
            this.f += e * this.b + f * this.d;
            this.c = c * this.a + d * this.c;
            this.d = c * this.b + d * this.d;
            this.a = aNew;
            this.b = bNew;
        }
        return this;
    };
    ;
    Matrix.prototype.multLeft = function (a, b, c, d, e, f) {
        if (a && a instanceof Matrix) {
            return this.multLeft(a.a, a.b, a.c, a.d, a.e, a.f);
        }
        else if (typeof a == 'number') {
            var aNew = a * this.a + c * this.b, cNew = a * this.c + c * this.d, eNew = a * this.e + c * this.f + e;
            this.b = b * this.a + d * this.b;
            this.d = b * this.c + d * this.d;
            this.f = b * this.e + d * this.f + f;
            this.a = aNew;
            this.c = cNew;
            this.e = eNew;
        }
        return this;
    };
    ;
    Matrix.prototype.invert = function () {
        var me = this, x = me.a * me.d - me.b * me.c;
        return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
    };
    ;
    Matrix.prototype.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
    };
    ;
    Matrix.prototype.translate = function (x, y) {
        this.e += x * this.a + y * this.c;
        this.f += x * this.b + y * this.d;
        return this;
    };
    ;
    Matrix.prototype.scale = function (x, y, cx, cy) {
        y == null && (y = x);
        (cx || cy) && this.translate(cx, cy);
        this.a *= x;
        this.b *= x;
        this.c *= y;
        this.d *= y;
        (cx || cy) && this.translate(-cx, -cy);
        return this;
    };
    ;
    Matrix.prototype.rotate = function (a, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        a = rad(a);
        x = x || 0;
        y = y || 0;
        var cos = +math.cos(a).toFixed(9), sin = +math.sin(a).toFixed(9);
        this.add(cos, sin, -sin, cos, x, y);
        return this.add(1, 0, 0, 1, -x, -y);
    };
    ;
    Matrix.prototype.skewX = function (x) {
        return this.skew(x, 0);
    };
    ;
    Matrix.prototype.skewY = function (y) {
        return this.skew(0, y);
    };
    ;
    Matrix.prototype.skew = function (x, y) {
        x = x || 0;
        y = y || 0;
        x = rad(x);
        y = rad(y);
        var c = parseFloat(math.tan(x).toFixed(9));
        var b = parseFloat(math.tan(y).toFixed(9));
        return this.add(1, b, c, 1, 0, 0);
    };
    ;
    Matrix.prototype.x = function (x, y) {
        return x * this.a + y * this.c + this.e;
    };
    ;
    Matrix.prototype.y = function (x, y) {
        return x * this.b + y * this.d + this.f;
    };
    ;
    Matrix.prototype.toString = function () {
        return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")";
    };
    ;
    Matrix.prototype.offset = function () {
        return [this.e.toFixed(4), this.f.toFixed(4)];
    };
    ;
    Matrix.prototype.norm = function (a) {
        return a[0] * a[0] + a[1] * a[1];
    };
    Matrix.prototype.normalize = function (a) {
        var mag = math.sqrt(this.norm(a));
        a[0] && (a[0] /= mag);
        a[1] && (a[1] /= mag);
    };
    Matrix.prototype.determinant = function () {
        return this.a * this.d - this.b * this.c;
    };
    ;
    Matrix.prototype.split = function () {
        var out = {};
        out.dx = this.e;
        out.dy = this.f;
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
        var sin = row[0][1], cos = row[1][1];
        if (cos < 0) {
            out.rotate = deg(math.acos(cos));
            if (sin < 0) {
                out.rotate = 360 - out.rotate;
            }
        }
        else {
            out.rotate = deg(math.asin(sin));
        }
        out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
        out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
        out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
        return out;
    };
    ;
    Matrix.prototype.toTransformString = function (shorter) {
        var s = shorter || this.split();
        if (!+s.shear.toFixed(9)) {
            s.scalex = +s.scalex.toFixed(4);
            s.scaley = +s.scaley.toFixed(4);
            s.rotate = +s.rotate.toFixed(4);
            return (s.dx || s.dy ? "t" + [+s.dx.toFixed(4), +s.dy.toFixed(4)] : E) +
                (s.rotate ? "r" + [+s.rotate.toFixed(4), 0, 0] : E) +
                (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E);
        }
        else {
            return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
        }
    };
    return Matrix;
}());
exports.Matrix = Matrix;
