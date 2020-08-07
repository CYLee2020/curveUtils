export declare function getPointAtLength(pathArr: number[], length: number): {
    x: number;
    y: number;
};
export declare function getTotalLength(pathArr: number[]): number;
export interface CurvePoint {
    x: number;
    y: number;
    m: {
        x: number;
        y: number;
    };
    n: {
        x: number;
        y: number;
    };
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
    alpha: number;
}
export declare function getSubpathsAtLength(pathArr: number[], ratio?: number): number[][];
export declare function bezierCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, ratio?: number): number[];
export declare function quadraticCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, ratio?: number): number[];
