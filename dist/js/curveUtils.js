(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.matrix = exports.curve = void 0;
var curve_a = __webpack_require__(2);
var matrix_a = __webpack_require__(3);
exports.default = exports.curve;
exports.curve = curve_a;
exports.matrix = matrix_a.default;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.path2curve = exports.pathBBox = exports.isPointInsideClosedPath = exports.pathIntersectionNumber = exports.pathIntersection = exports.getSubpathsAtLength = exports.getPointAtLength = exports.getTotalLength = exports.getLengthFactory = exports.matrixPath = void 0;
var Str = String, objectToString = Object.prototype.toString, has = "hasOwnProperty", p2s = /,?([a-z]),?/gi, toFloat = parseFloat, math = Math, PI = math.PI, mmin = math.min, mmax = math.max, pow = math.pow, abs = math.abs;
function clone(obj) {
    if (typeof obj == "function" || Object(obj) !== obj) {
        return obj;
    }
    var res = new obj.constructor;
    for (var key in obj)
        if (obj[has](key)) {
            res[key] = clone(obj[key]);
        }
    return res;
}
function matrixPath(path, matrix) {
    if (!matrix) {
        return path;
    }
    var x, y, i, j, ii, jj, pathi;
    path = path2curve(path);
    for (i = 0, ii = path.length; i < ii; i++) {
        pathi = path[i];
        for (j = 1, jj = pathi.length; j < jj; j += 2) {
            x = matrix.x(pathi[j], pathi[j + 1]);
            y = matrix.y(pathi[j], pathi[j + 1]);
            pathi[j] = x;
            pathi[j + 1] = y;
        }
    }
    return path;
}
exports.matrixPath = matrixPath;
var paths = (function () {
    var p = {};
    return function (ps) {
        if (p[ps]) {
            p[ps].sleep = 100;
        }
        else {
            p[ps] = {
                sleep: 100
            };
        }
        setTimeout(function () {
            for (var key in p)
                if (p[has](key) && key != ps) {
                    p[key].sleep--;
                    !p[key].sleep && delete p[key];
                }
        });
        return p[ps];
    };
})();
function box(bbox1, bbox2, width, height) {
    var x = 0, y = null;
    if (bbox1 == null) {
        x = y = width = height = 0;
    }
    if (y == null && bbox1) {
        bbox1 = bbox1;
        y = bbox1.y;
        width = bbox1.width;
        height = bbox1.height;
        x = bbox1.x;
    }
    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;
    return {
        x: x,
        y: y,
        width: width,
        w: width,
        height: height,
        h: height,
        x2: x + width,
        y2: y + height,
        cx: x + width / 2,
        cy: y + height / 2,
        r1: math.min(width, height) / 2,
        r2: math.max(width, height) / 2,
        r0: math.sqrt(width * width + height * height) / 2,
        path: rectPath(x, y, width, height),
        vb: [x, y, width, height].join(" ")
    };
}
function toString() {
    return this.join(",").replace(p2s, "$1");
}
function pathClone(pathArray) {
    var res = clone(pathArray);
    res.toString = toString;
    return res;
}
function getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
    if (length == null) {
        return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
    }
    else {
        return findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTotLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
    }
}
function getLengthFactory(istotal, subpath) {
    function O(val) {
        return +(+val).toFixed(3);
    }
    return function (pathString, length, onlystart) {
        var path = path2curve(pathString);
        var x = 0, y = 0, p = [], l = 0, sp = "", subpaths = { start: '', end: '' }, point, len = 0;
        for (var i = 0, ii = path.length; i < ii; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = +p[1];
                y = +p[2];
            }
            else {
                l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                if (len + l > length) {
                    if (subpath && !subpaths.start) {
                        point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                        sp += [
                            "C" + O(point.start.x),
                            O(point.start.y),
                            O(point.m.x),
                            O(point.m.y),
                            O(point.x),
                            O(point.y)
                        ];
                        if (onlystart) {
                            return sp;
                        }
                        subpaths.start = sp;
                        sp = [
                            "M" + O(point.x),
                            O(point.y) + "C" + O(point.n.x),
                            O(point.n.y),
                            O(point.end.x),
                            O(point.end.y),
                            O(p[5]),
                            O(p[6])
                        ].join();
                        len += l;
                        x = +p[5];
                        y = +p[6];
                        continue;
                    }
                    if (!istotal && !subpath) {
                        point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                        return point;
                    }
                }
                len += l;
                x = +p[5];
                y = +p[6];
            }
            sp += p.shift() + p;
        }
        subpaths.end = sp;
        point = istotal ? len : subpath ? subpaths : findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
        return point;
    };
}
exports.getLengthFactory = getLengthFactory;
exports.getTotalLength = function (pathString) {
    return getLengthFactory(1).apply(this, [pathString, 0, false]);
};
exports.getPointAtLength = function (pathString, length) {
    return getLengthFactory().apply(this, [pathString, length, false]);
};
function getSubpathsAtLength(pathString, length, onlystart) {
    if (onlystart === void 0) { onlystart = false; }
    return getLengthFactory(0, 1).apply(this, [pathString, length, onlystart]);
}
exports.getSubpathsAtLength = getSubpathsAtLength;
function findDotsAtSegment() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var p1x = args[0], p1y = args[1], c1x = args[2], c1y = args[3], c2x = args[4], c2y = args[5], p2x = args[6], p2y = args[7], t = args[8];
    var t1 = 1 - t, t13 = pow(t1, 3), t12 = pow(t1, 2), t2 = t * t, t3 = t2 * t, x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x, y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y, mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x), my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y), nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x), ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y), ax = t1 * p1x + t * c1x, ay = t1 * p1y + t * c1y, cx = t1 * c2x + t * p2x, cy = t1 * c2y + t * p2y, alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI;
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
function is(o, type) {
    type = Str.prototype.toLowerCase.call(type);
    if (type == "finite") {
        return isFinite(o);
    }
    if (type == "array" &&
        (o instanceof Array || Array.isArray && Array.isArray(o))) {
        return true;
    }
    return type == "null" && o === null ||
        type == typeof o && o !== null ||
        type == "object" && o === Object(o) ||
        objectToString.call(o).slice(8, -1).toLowerCase() == type;
}
function bezierBBox(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
    var ps;
    if (!is(p1x, "array")) {
        ps = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
    }
    else {
        ps = p1x;
    }
    ps = ps;
    var bbox = curveDim.apply(null, ps);
    return box(bbox.min.x, bbox.min.y, bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y);
}
function isPointInsideBBox(bbox, x, y) {
    return x >= bbox.x &&
        x <= bbox.x + bbox.width &&
        y >= bbox.y &&
        y <= bbox.y + bbox.height;
}
function isBBoxIntersect(box1, box2) {
    var bbox1 = box(box1);
    var bbox2 = box(box2);
    return isPointInsideBBox(bbox2, bbox1.x, bbox1.y)
        || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y)
        || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2)
        || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2)
        || isPointInsideBBox(bbox1, bbox2.x, bbox2.y)
        || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y)
        || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2)
        || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2)
        || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x
            || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
            && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y
                || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
}
function base3(t, p1, p2, p3, p4) {
    var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4, t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
    return t * t2 - 3 * p1 + 3 * p2;
}
function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
    if (z === void 0) { z = 1; }
    z = z > 1 ? 1 : z < 0 ? 0 : z;
    var z2 = z / 2, n = 12, Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], sum = 0;
    for (var i = 0; i < n; i++) {
        var ct = z2 * Tvalues[i] + z2, xbase = base3(ct, x1, x2, x3, x4), ybase = base3(ct, y1, y2, y3, y4), comb = xbase * xbase + ybase * ybase;
        sum += Cvalues[i] * math.sqrt(comb);
    }
    return z2 * sum;
}
function getTotLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
    if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
        return 0;
    }
    var t = 1, step = t / 2, t2 = t - step, l, e = .01;
    l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
    while (abs(l - ll) > e) {
        step /= 2;
        t2 += (l < ll ? 1 : -1) * step;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
    }
    return t2;
}
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    if (mmax(x1, x2) < mmin(x3, x4) ||
        mmin(x1, x2) > mmax(x3, x4) ||
        mmax(y1, y2) < mmin(y3, y4) ||
        mmin(y1, y2) > mmax(y3, y4)) {
        return;
    }
    var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4), ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4), denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (!denominator) {
        return;
    }
    var px = nx / denominator, py = ny / denominator, px2 = +px.toFixed(2), py2 = +py.toFixed(2);
    if (px2 < +mmin(x1, x2).toFixed(2) ||
        px2 > +mmax(x1, x2).toFixed(2) ||
        px2 < +mmin(x3, x4).toFixed(2) ||
        px2 > +mmax(x3, x4).toFixed(2) ||
        py2 < +mmin(y1, y2).toFixed(2) ||
        py2 > +mmax(y1, y2).toFixed(2) ||
        py2 < +mmin(y3, y4).toFixed(2) ||
        py2 > +mmax(y3, y4).toFixed(2)) {
        return;
    }
    return { x: px, y: py };
}
function interHelper(bez1, bez2, justCount) {
    if (justCount === void 0) { justCount = 0; }
    var bbox1 = bezierBBox(bez1), bbox2 = bezierBBox(bez2);
    if (!isBBoxIntersect(bbox1, bbox2)) {
        return justCount ? 0 : [];
    }
    var l1 = bezlen.apply(0, bez1), l2 = bezlen.apply(0, bez2), n1 = ~~(l1 / 8), n2 = ~~(l2 / 8), dots1 = [], dots2 = [], xy = {}, res = justCount ? 0 : [];
    for (var i = 0; i < n1 + 1; i++) {
        var p = findDotsAtSegment.apply(0, bez1.concat(i / n1));
        dots1.push({ x: p.x, y: p.y, t: i / n1 });
    }
    for (i = 0; i < n2 + 1; i++) {
        p = findDotsAtSegment.apply(0, bez2.concat(i / n2));
        dots2.push({ x: p.x, y: p.y, t: i / n2 });
    }
    for (i = 0; i < n1; i++) {
        for (var j = 0; j < n2; j++) {
            var di = dots1[i], di1 = dots1[i + 1], dj = dots2[j], dj1 = dots2[j + 1], ci = abs(di1.x - di.x) < .001 ? "y" : "x", cj = abs(dj1.x - dj.x) < .001 ? "y" : "x", is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
            if (is) {
                if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                    continue;
                }
                xy[is.x.toFixed(4)] = is.y.toFixed(4);
                var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t), t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
                    if (justCount && typeof res == 'number') {
                        res++;
                    }
                    else if (typeof res == 'object') {
                        res.push({
                            x: is.x,
                            y: is.y,
                            t1: t1,
                            t2: t2
                        });
                    }
                }
            }
        }
    }
    return res;
}
function interPathHelper(path1String, path2String, justCount) {
    if (justCount === void 0) { justCount = 0; }
    var path1 = path2curve(path1String);
    var path2 = path2curve(path2String);
    var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2, res = justCount ? 0 : [];
    for (var i = 0, ii = path1.length; i < ii; i++) {
        var pi = path1[i];
        if (pi[0] == "M") {
            x1 = x1m = pi[1];
            y1 = y1m = pi[2];
        }
        else {
            if (pi[0] == "C") {
                bez1 = [x1, y1].concat(pi.slice(1));
                x1 = bez1[6];
                y1 = bez1[7];
            }
            else {
                bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                x1 = x1m;
                y1 = y1m;
            }
            for (var j = 0, jj = path2.length; j < jj; j++) {
                var pj = path2[j];
                if (pj[0] == "M") {
                    x2 = x2m = pj[1];
                    y2 = y2m = pj[2];
                }
                else {
                    if (pj[0] == "C") {
                        bez2 = [x2, y2].concat(pj.slice(1));
                        x2 = bez2[6];
                        y2 = bez2[7];
                    }
                    else {
                        bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                        x2 = x2m;
                        y2 = y2m;
                    }
                    var intr = interHelper(bez1, bez2, justCount);
                    if (justCount) {
                        res += intr;
                    }
                    else if (typeof intr == 'object') {
                        for (var k = 0, kk = intr.length; k < kk; k++) {
                            intr[k].segment1 = i;
                            intr[k].segment2 = j;
                            intr[k].bez1 = bez1;
                            intr[k].bez2 = bez2;
                        }
                        res = res.concat(intr);
                    }
                }
            }
        }
    }
    return res;
}
function pathIntersection(path1, path2) {
    return interPathHelper(path1, path2);
}
exports.pathIntersection = pathIntersection;
function pathIntersectionNumber(path1, path2) {
    return interPathHelper(path1, path2, 1);
}
exports.pathIntersectionNumber = pathIntersectionNumber;
function isPointInsideClosedPath(path, x, y) {
    var bbox = pathBBox(path);
    return isPointInsideBBox(bbox, x, y) &&
        interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
}
exports.isPointInsideClosedPath = isPointInsideClosedPath;
function pathBBox(pathString) {
    var pth = paths(pathString);
    if (pth.bbox) {
        return clone(pth.bbox);
    }
    if (!pathString) {
        return box();
    }
    var path = path2curve(pathString);
    var x = 0, y = 0, X = [], Y = [], p;
    for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i];
        if (p[0] == "M") {
            x = p[1];
            y = p[2];
            X.push(x);
            Y.push(y);
        }
        else {
            var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
            X = X.concat(dim.min.x, dim.max.x);
            Y = Y.concat(dim.min.y, dim.max.y);
            x = p[5];
            y = p[6];
        }
    }
    var xmin = mmin.apply(0, X), ymin = mmin.apply(0, Y), xmax = mmax.apply(0, X), ymax = mmax.apply(0, Y), bb = box(xmin, ymin, xmax - xmin, ymax - ymin);
    pth.bbox = clone(bb);
    return bb;
}
exports.pathBBox = pathBBox;
function rectPath(x, y, w, h, r) {
    if (r) {
        return [
            ["M", +x + +r, y],
            ["l", w - r * 2, 0],
            ["a", r, r, 0, 0, 1, r, r],
            ["l", 0, h - r * 2],
            ["a", r, r, 0, 0, 1, -r, r],
            ["l", r * 2 - w, 0],
            ["a", r, r, 0, 0, 1, -r, -r],
            ["l", 0, r * 2 - h],
            ["a", r, r, 0, 0, 1, r, -r],
            ["z"]
        ];
    }
    var res = [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
    res.toString = toString;
    return res;
}
function ellipsePath(x, y, rx, ry, a) {
    if (a == null && ry == null) {
        ry = rx;
    }
    x = +x;
    y = +y;
    rx = +rx;
    ry = +ry;
    if (a != null) {
        var rad = Math.PI / 180, x1 = x + rx * Math.cos(-ry * rad), x2 = x + rx * Math.cos(-a * rad), y1 = y + rx * Math.sin(-ry * rad), y2 = y + rx * Math.sin(-a * rad), res = [["M", x1, y1], ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]];
    }
    else {
        res = [
            ["M", x, y],
            ["m", 0, -ry],
            ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
            ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
            ["z"]
        ];
    }
    res.toString = toString;
    return res;
}
var pathCommand = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig, tCommand = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig, pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\s]*,?[\s]*/ig;
function parsePathString(pathString) {
    if (!pathString) {
        return null;
    }
    var pth = paths(pathString);
    if (pth.arr) {
        return clone(pth.arr);
    }
    var paramCounts = { a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0 }, data = [];
    if (is(pathString, "array") && is(pathString[0], "array")) {
        data = clone(pathString);
    }
    if (!data.length) {
        Str(pathString).replace(pathCommand, function (a, b, c) {
            var params = [], name = b.toLowerCase();
            c.replace(pathValues, function (a, b) {
                b && params.push(+b);
                return a;
            });
            if (name == "m" && params.length > 2) {
                data.push([b].concat(params.splice(0, 2)));
                name = "l";
                b = b == "m" ? "l" : "L";
            }
            if (name == "o" && params.length == 1) {
                data.push([b, params[0]]);
            }
            if (name == "r") {
                data.push([b].concat(params));
            }
            else
                while (params.length >= paramCounts[name]) {
                    data.push([b].concat(params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            return a;
        });
    }
    data.toString = paths.toString;
    pth.arr = clone(data);
    return data;
}
;
function pathToRelative(pathArray) {
    var pth = paths(pathArray), lowerCase = String.prototype.toLowerCase;
    if (pth.rel) {
        return pathClone(pth.rel);
    }
    if (!is(pathArray, "array") || !is(pathArray && pathArray[0], "array")) {
        pathArray = parsePathString(pathArray);
    }
    var res = [], x = 0, y = 0, mx = 0, my = 0, start = 0;
    if (pathArray[0][0] == "M") {
        x = pathArray[0][1];
        y = pathArray[0][2];
        mx = x;
        my = y;
        start++;
        res.push(["M", x, y]);
    }
    for (var i = start, ii = pathArray.length; i < ii; i++) {
        var r = res[i] = [], pa = pathArray[i];
        if (pa[0] != lowerCase.call(pa[0])) {
            r[0] = lowerCase.call(pa[0]);
            switch (r[0]) {
                case "a":
                    r[1] = pa[1];
                    r[2] = pa[2];
                    r[3] = pa[3];
                    r[4] = pa[4];
                    r[5] = pa[5];
                    r[6] = +(pa[6] - x).toFixed(3);
                    r[7] = +(pa[7] - y).toFixed(3);
                    break;
                case "v":
                    r[1] = +(pa[1] - y).toFixed(3);
                    break;
                case "m":
                    mx = pa[1];
                    my = pa[2];
                    continue;
                default:
                    for (var j = 1, jj = pa.length; j < jj; j++) {
                        r[j] = +(pa[j] - (j % 2 ? x : y)).toFixed(3);
                    }
            }
        }
        else {
            r = res[i] = [];
            if (pa[0] == "m") {
                mx = pa[1] + x;
                my = pa[2] + y;
            }
            for (var k = 0, kk = pa.length; k < kk; k++) {
                res[i][k] = pa[k];
            }
        }
        var len = res[i].length;
        switch (res[i][0]) {
            case "z":
                x = mx;
                y = my;
                break;
            case "h":
                x += +res[i][len - 1];
                break;
            case "v":
                y += +res[i][len - 1];
                break;
            default:
                x += +res[i][len - 2];
                y += +res[i][len - 1];
        }
    }
    res.toString = toString;
    pth.rel = pathClone(res);
    return res;
}
function pathToAbsolute(pathArray) {
    var pth = paths(pathArray);
    if (pth.abs) {
        return pathClone(pth.abs);
    }
    if (!is(pathArray, "array") || !is(pathArray && pathArray[0], "array")) {
        pathArray = parsePathString(pathArray);
    }
    if (!pathArray || !pathArray.length) {
        return [["M", 0, 0]];
    }
    var res = [], x = 0, y = 0, mx = 0, my = 0, start = 0, pa0;
    if (pathArray[0][0] == "M") {
        x = +pathArray[0][1];
        y = +pathArray[0][2];
        mx = x;
        my = y;
        start++;
        res[0] = ["M", x, y];
    }
    var crz = pathArray.length == 3 &&
        pathArray[0][0] == "M" &&
        pathArray[1][0].toUpperCase() == "R" &&
        pathArray[2][0].toUpperCase() == "Z";
    for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
        res.push(r = []);
        var pa_1 = pathArray[i];
        pa0 = pa_1[0];
        if (pa0 != pa0.toUpperCase()) {
            r[0] = pa0.toUpperCase();
            var dots = [];
            switch (r[0]) {
                case "A":
                    r[1] = pa_1[1];
                    r[2] = pa_1[2];
                    r[3] = pa_1[3];
                    r[4] = pa_1[4];
                    r[5] = pa_1[5];
                    r[6] = +pa_1[6] + x;
                    r[7] = +pa_1[7] + y;
                    break;
                case "V":
                    r[1] = +pa_1[1] + y;
                    break;
                case "H":
                    r[1] = +pa_1[1] + x;
                    break;
                case "R":
                    dots = [x, y].concat(pa_1.slice(1));
                    for (var j = 2, jj = dots.length; j < jj; j++) {
                        dots[j] = +dots[j] + x;
                        dots[++j] = +dots[j] + y;
                    }
                    res.pop();
                    res = res.concat(catmullRom2bezier(dots, crz));
                    break;
                case "O":
                    res.pop();
                    dots = ellipsePath(x, y, pa_1[1], pa_1[2]);
                    dots.push(dots[0]);
                    res = res.concat(dots);
                    break;
                case "U":
                    res.pop();
                    res = res.concat(ellipsePath(x, y, pa_1[1], pa_1[2], pa_1[3]));
                    r = ["U"].concat(res[res.length - 1].slice(-2));
                    break;
                case "M":
                    mx = +pa_1[1] + x;
                    my = +pa_1[2] + y;
                    continue;
                default:
                    for (j = 1, jj = pa_1.length; j < jj; j++) {
                        r[j] = +pa_1[j] + (j % 2 ? x : y);
                    }
            }
        }
        else if (pa0 == "R") {
            dots = [x, y].concat(pa_1.slice(1));
            res.pop();
            res = res.concat(catmullRom2bezier(dots, crz));
            r = ["R"].concat(pa_1.slice(-2));
        }
        else if (pa0 == "O") {
            res.pop();
            dots = ellipsePath(x, y, pa_1[1], pa_1[2]);
            dots.push(dots[0]);
            res = res.concat(dots);
        }
        else if (pa0 == "U") {
            res.pop();
            res = res.concat(ellipsePath(x, y, pa_1[1], pa_1[2], pa_1[3]));
            r = ["U"].concat(res[res.length - 1].slice(-2));
        }
        else {
            for (var k = 0, kk = pa_1.length; k < kk; k++) {
                r[k] = pa_1[k];
            }
        }
        pa0 = pa0.toUpperCase();
        if (pa0 != "O") {
            switch (r[0]) {
                case "Z":
                    x = +mx;
                    y = +my;
                    break;
                case "H":
                    x = r[1];
                    break;
                case "V":
                    y = r[1];
                    break;
                case "M":
                    mx = r[r.length - 2];
                    my = r[r.length - 1];
                    continue;
                default:
                    x = r[r.length - 2];
                    y = r[r.length - 1];
            }
        }
    }
    res.toString = toString;
    pth.abs = pathClone(res);
    return res;
}
function l2c(x1, y1, x2, y2) {
    return [x1, y1, x2, y2, x2, y2];
}
function q2c(x1, y1, ax, ay, x2, y2) {
    var _13 = 1 / 3, _23 = 2 / 3;
    return [
        _13 * x1 + _23 * ax,
        _13 * y1 + _23 * ay,
        _13 * x2 + _23 * ax,
        _13 * y2 + _23 * ay,
        x2,
        y2
    ];
}
function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
    var _120 = PI * 120 / 180, rad = PI / 180 * (+angle || 0), res = [], xy, rotate = function (x, y, rad) {
        var X = x * math.cos(rad) - y * math.sin(rad), Y = x * math.sin(rad) + y * math.cos(rad);
        return { x: X, y: Y };
    };
    if (!rx || !ry) {
        return [x1, y1, x2, y2, x2, y2];
    }
    if (!recursive) {
        xy = rotate(x1, y1, -rad);
        x1 = xy.x;
        y1 = xy.y;
        xy = rotate(x2, y2, -rad);
        x2 = xy.x;
        y2 = xy.y;
        var cos = math.cos(PI / 180 * angle), sin = math.sin(PI / 180 * angle), x = (x1 - x2) / 2, y = (y1 - y2) / 2;
        var h = x * x / (rx * rx) + y * y / (ry * ry);
        if (h > 1) {
            h = math.sqrt(h);
            rx = h * rx;
            ry = h * ry;
        }
        var rx2 = rx * rx, ry2 = ry * ry, k = (large_arc_flag == sweep_flag ? -1 : 1) *
            math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))), cx = k * rx * y / ry + (x1 + x2) / 2, cy = k * -ry * x / rx + (y1 + y2) / 2, f1 = math.asin(parseFloat(((y1 - cy) / ry).toFixed(9))), f2 = math.asin(parseFloat(((y2 - cy) / ry).toFixed(9)));
        f1 = x1 < cx ? PI - f1 : f1;
        f2 = x2 < cx ? PI - f2 : f2;
        f1 < 0 && (f1 = PI * 2 + f1);
        f2 < 0 && (f2 = PI * 2 + f2);
        if (sweep_flag && f1 > f2) {
            f1 = f1 - PI * 2;
        }
        if (!sweep_flag && f2 > f1) {
            f2 = f2 - PI * 2;
        }
    }
    else {
        f1 = recursive[0];
        f2 = recursive[1];
        cx = recursive[2];
        cy = recursive[3];
    }
    var df = f2 - f1;
    if (abs(df) > _120) {
        var f2old = f2, x2old = x2, y2old = y2;
        f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
        x2 = cx + rx * math.cos(f2);
        y2 = cy + ry * math.sin(f2);
        res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
    }
    df = f2 - f1;
    var c1 = math.cos(f1), s1 = math.sin(f1), c2 = math.cos(f2), s2 = math.sin(f2), t = math.tan(df / 4), hx = 4 / 3 * rx * t, hy = 4 / 3 * ry * t, m1 = [x1, y1], m2 = [x1 + hx * s1, y1 - hy * c1], m3 = [x2 + hx * s2, y2 - hy * c2], m4 = [x2, y2];
    m2[0] = 2 * m1[0] - m2[0];
    m2[1] = 2 * m1[1] - m2[1];
    if (recursive) {
        return [m2, m3, m4].concat(res);
    }
    else {
        res = [m2, m3, m4].concat(res).join().split(",");
        var newres = [];
        for (var i = 0, ii = res.length; i < ii; i++) {
            newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
        }
        return newres;
    }
}
function findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
    var t1 = 1 - t;
    return {
        x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
        y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
    };
}
function curveDim(x0, y0, x1, y1, x2, y2, x3, y3) {
    var tvalues = [], bounds = [[], []], a, b, c, t, t1, t2, b2ac, sqrtb2ac;
    for (var i = 0; i < 2; ++i) {
        if (i == 0) {
            b = 6 * x0 - 12 * x1 + 6 * x2;
            a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
            c = 3 * x1 - 3 * x0;
        }
        else {
            b = 6 * y0 - 12 * y1 + 6 * y2;
            a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
            c = 3 * y1 - 3 * y0;
        }
        if (abs(a) < 1e-12) {
            if (abs(b) < 1e-12) {
                continue;
            }
            t = -c / b;
            if (0 < t && t < 1) {
                tvalues.push(t);
            }
            continue;
        }
        b2ac = b * b - 4 * c * a;
        sqrtb2ac = math.sqrt(b2ac);
        if (b2ac < 0) {
            continue;
        }
        t1 = (-b + sqrtb2ac) / (2 * a);
        if (0 < t1 && t1 < 1) {
            tvalues.push(t1);
        }
        t2 = (-b - sqrtb2ac) / (2 * a);
        if (0 < t2 && t2 < 1) {
            tvalues.push(t2);
        }
    }
    var x, y, j = tvalues.length, jlen = j, mt;
    while (j--) {
        t = tvalues[j];
        mt = 1 - t;
        bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
        bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    }
    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
    bounds[0].length = bounds[1].length = jlen + 2;
    return {
        min: { x: mmin.apply(0, bounds[0]), y: mmin.apply(0, bounds[1]) },
        max: { x: mmax.apply(0, bounds[0]), y: mmax.apply(0, bounds[1]) }
    };
}
function path2curve(pathString, path2) {
    var pth = !path2 && paths(pathString);
    if (!path2 && pth.curve) {
        return pathClone(pth.curve);
    }
    var p = pathToAbsolute(pathString), p2 = path2 && pathToAbsolute(path2), attrs = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, attrs2 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, processPath = function (path, d, pcom) {
        var nx, ny;
        if (!path) {
            return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
        }
        !(path[0] in { T: 1, Q: 1 }) && (d.qx = d.qy = null);
        switch (path[0]) {
            case "M":
                d.X = path[1];
                d.Y = path[2];
                break;
            case "A":
                path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
                break;
            case "S":
                if (pcom == "C" || pcom == "S") {
                    nx = d.x * 2 - d.bx;
                    ny = d.y * 2 - d.by;
                }
                else {
                    nx = d.x;
                    ny = d.y;
                }
                path = ["C", nx, ny].concat(path.slice(1));
                break;
            case "T":
                if (pcom == "Q" || pcom == "T") {
                    d.qx = d.x * 2 - d.qx;
                    d.qy = d.y * 2 - d.qy;
                }
                else {
                    d.qx = d.x;
                    d.qy = d.y;
                }
                path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                break;
            case "Q":
                d.qx = path[1];
                d.qy = path[2];
                path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                break;
            case "L":
                path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
                break;
            case "H":
                path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
                break;
            case "V":
                path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
                break;
            case "Z":
                path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
                break;
        }
        return path;
    }, fixArc = function (pp, i) {
        if (pp[i].length > 7) {
            pp[i].shift();
            var pi = pp[i];
            while (pi.length) {
                pcoms1[i] = "A";
                p2 && (pcoms2[i] = "A");
                pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
            }
            pp.splice(i, 1);
            ii = mmax(p.length, p2 && p2.length || 0);
        }
    }, fixM = function (path1, path2, a1, a2, i) {
        if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
            path2.splice(i, 0, ["M", a2.x, a2.y]);
            a1.bx = 0;
            a1.by = 0;
            a1.x = path1[i][1];
            a1.y = path1[i][2];
            ii = mmax(p.length, p2 && p2.length || 0);
        }
    }, pcoms1 = [], pcoms2 = [], pfirst = "", pcom = "";
    for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
        p[i] && (pfirst = p[i][0]);
        if (pfirst != "C") {
            pcoms1[i] = pfirst;
            i && (pcom = pcoms1[i - 1]);
        }
        p[i] = processPath(p[i], attrs, pcom);
        if (pcoms1[i] != "A" && pfirst == "C")
            pcoms1[i] = "C";
        fixArc(p, i);
        if (p2) {
            p2[i] && (pfirst = p2[i][0]);
            if (pfirst != "C") {
                pcoms2[i] = pfirst;
                i && (pcom = pcoms2[i - 1]);
            }
            p2[i] = processPath(p2[i], attrs2, pcom);
            if (pcoms2[i] != "A" && pfirst == "C") {
                pcoms2[i] = "C";
            }
            fixArc(p2, i);
        }
        fixM(p, p2, attrs, attrs2, i);
        fixM(p2, p, attrs2, attrs, i);
        var seg = p[i], seg2 = p2 && p2[i], seglen = seg.length, seg2len = p2 && seg2.length;
        attrs.x = seg[seglen - 2];
        attrs.y = seg[seglen - 1];
        attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
        attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
        attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
        attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
        attrs2.x = p2 && seg2[seg2len - 2];
        attrs2.y = p2 && seg2[seg2len - 1];
    }
    if (!p2) {
        pth.curve = pathClone(p);
    }
    return p2 ? [p, p2] : p;
}
exports.path2curve = path2curve;
function catmullRom2bezier(crp, z) {
    var d = [];
    for (var i = 0, iLen = crp.length; iLen - 2 * (z ? 1 : 0) > i; i += 2) {
        var p = [
            { x: +crp[i - 2], y: +crp[i - 1] },
            { x: +crp[i], y: +crp[i + 1] },
            { x: +crp[i + 2], y: +crp[i + 3] },
            { x: +crp[i + 4], y: +crp[i + 5] }
        ];
        if (z) {
            if (!i) {
                p[0] = { x: +crp[iLen - 2], y: +crp[iLen - 1] };
            }
            else if (iLen - 4 == i) {
                p[3] = { x: +crp[0], y: +crp[1] };
            }
            else if (iLen - 2 == i) {
                p[2] = { x: +crp[0], y: +crp[1] };
                p[3] = { x: +crp[2], y: +crp[3] };
            }
        }
        else {
            if (iLen - 4 == i) {
                p[3] = p[2];
            }
            else if (!i) {
                p[0] = { x: +crp[i], y: +crp[i + 1] };
            }
        }
        d.push(["C",
            (-p[0].x + 6 * p[1].x + p[2].x) / 6,
            (-p[0].y + 6 * p[1].y + p[2].y) / 6,
            (p[1].x + 6 * p[2].x - p[3].x) / 6,
            (p[1].y + 6 * p[2].y - p[3].y) / 6,
            p[2].x,
            p[2].y
        ]);
    }
    return d;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
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


/***/ })
/******/ ]);
});