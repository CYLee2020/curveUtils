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
exports.quadraticCurve = exports.bezierCurve = exports.getSubpathsAtLength = exports.getTotalLength = exports.getPointAtLength = void 0;
function PointOnCubicBezier(cp, t) {
    var F = {}, G = {}, H = {}, I = {}, J = {};
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
function PointOnCubicBezier2(cp, t) {
    var F = {}, G = {}, H = {}, I = {}, J = {};
    F.x = cp[0].x * (1 - t) + cp[1].x * t * 2;
    F.y = cp[0].y * (1 - t) + cp[1].y * t * 2;
    G.x = t * t * cp[2].x;
    G.y = t * t * cp[2].y;
    return { x: F.x * (1 - t) + G.x, y: F.y * (1 - t) + G.y };
}
function base3(t, p1, p2, p3, p4) {
    var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4, t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
    return t * t2 - 3 * p1 + 3 * p2;
}
function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
    if (z == null) {
        z = 1;
    }
    z = z > 1 ? 1 : z < 0 ? 0 : z;
    var z2 = z / 2, n = 12, Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], sum = 0;
    for (var i = 0; i < n; i++) {
        var ct = z2 * Tvalues[i] + z2, xbase = base3(ct, x1, x2, x3, x4), ybase = base3(ct, y1, y2, y3, y4), comb = xbase * xbase + ybase * ybase;
        sum += Cvalues[i] * Math.sqrt(comb);
    }
    return z2 * sum;
}
function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
    var t1 = 1 - t, t13 = Math.pow(t1, 3), t12 = Math.pow(t1, 2), t2 = t * t, t3 = t2 * t, x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x, y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y, mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x), my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y), nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x), ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y), ax = t1 * p1x + t * c1x, ay = t1 * p1y + t * c1y, cx = t1 * c2x + t * p2x, cy = t1 * c2y + t * p2y, alpha = 90 - Math.atan2(mx - nx, my - ny) * 180 / Math.PI;
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
function getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
    if (length == null) {
        return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
    }
    else {
        return findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTotLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
    }
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
function O(val) {
    return +(+val).toFixed(3);
}
function getTotLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
    if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
        return 0;
    }
    var t = 1, step = t / 2, t2 = t - step, l, e = .01;
    l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
    while (Math.abs(l - ll) > e) {
        step /= 2;
        t2 += (l < ll ? 1 : -1) * step;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
    }
    return t2;
}
function forMathPathArgs(args) {
    var path = [args.slice(0, 2), args.slice(2, 8)];
    var other = args.slice(8);
    if (other && other.length % 6 == 0) {
        var start = 0;
        while (start < other.length) {
            path.push(other.slice(start, start + 6));
            start += 6;
        }
    }
    return path;
}
function getPointAtLength(pathArr, length) {
    var path = forMathPathArgs(pathArr);
    var x = 0, y = 0, p, l = 0, len = 0;
    for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i];
        if (p.length == 2) {
            x = +p[0];
            y = +p[1];
        }
        else {
            l = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5]);
            if (len + l > length) {
                var point_1 = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5], length - len);
                return point_1;
            }
            len += l;
            x = +p[4];
            y = +p[5];
        }
    }
    var point = findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
    return point;
}
exports.getPointAtLength = getPointAtLength;
function getTotalLength(pathArr) {
    var path = forMathPathArgs(pathArr);
    var x = 0, y = 0, p, l = 0, len = 0;
    for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i];
        if (p.length == 2) {
            x = +p[0];
            y = +p[1];
        }
        else {
            l = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5]);
            len += l;
            x = +p[4];
            y = +p[5];
        }
    }
    return len;
}
exports.getTotalLength = getTotalLength;
;
function getSubpathsAtLength(pathArr, ratio) {
    if (ratio === void 0) { ratio = 1; }
    var path = forMathPathArgs(pathArr);
    var length = getTotalLength(pathArr) * ratio;
    var x = 0, y = 0, p = [], l = 0, sp = [], point, len = 0;
    for (var i = 0, ii = path.length; i < ii; i++) {
        p = path[i];
        if (p.length == 2) {
            x = +p[0];
            y = +p[1];
        }
        else {
            l = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5]);
            if (len + l > length) {
                point = getPointAtSegmentLength(x, y, p[0], p[1], p[2], p[3], p[4], p[5], length - len);
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
exports.getSubpathsAtLength = getSubpathsAtLength;
function bezierCurve(x1, y1, x2, y2, x3, y3, x4, y4, ratio) {
    if (ratio === void 0) { ratio = 1; }
    var c = [x1, y1, x2, y2, x3, y3, x4, y4];
    var curvePoints = getSubpathsAtLength(c, ratio);
    return curvePoints.reduce(function (a, b) { return a.concat(b); });
}
exports.bezierCurve = bezierCurve;
function quadraticCurve(x1, y1, x2, y2, x3, y3, ratio) {
    if (ratio === void 0) { ratio = 1; }
    var _a = q2c(x1, y1, x2, y2, x3, y3), c1x = _a[0], c1y = _a[1], c2x = _a[2], c2y = _a[3], x4 = _a[4], y4 = _a[5];
    return bezierCurve(x1, y1, c1x, c1y, c2x, c2y, x4, y4, ratio);
}
exports.quadraticCurve = quadraticCurve;


/***/ })
/******/ ]);
});