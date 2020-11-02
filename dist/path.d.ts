export declare type CurveObject = ({
    0: string;
    [index: number]: any;
}) & Array<any>;
export declare function matrixPath<T extends {
    x: (...args: any[]) => number;
    y: (...args: any[]) => number;
}>(path: string | CurveObject[], matrix: T): string | CurveObject[];
export declare function getLengthFactory(istotal?: number, subpath?: number): (pathString: string | CurveObject[], length: number, onlystart: boolean) => string | number | {
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
} | {
    start: string;
    end: string;
};
declare type DotType = {
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
};
export declare let getTotalLength: (pathString: string | CurveObject[]) => number;
export declare let getPointAtLength: (pathString: string, length: number) => DotType;
export declare function getSubpathsAtLength(pathString: string | CurveObject[], length: number, onlystart?: false): {
    start: string;
    end: string;
};
export declare function getSubpathsAtLength(pathString: string | CurveObject[], length: number, onlystart?: true): string;
export declare type BBox = BaseBox & {
    x2: number;
    y2: number;
    qx?: number;
    qy?: number;
    bx?: number;
    by?: number;
};
export declare type BaseBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};
declare type iterType = {
    x: number;
    y: number;
    t1: number;
    t2: number;
    segment1?: number;
    segment2?: number;
    bez1?: number[];
    bez2?: number[];
};
export declare function pathIntersection(path1: string | CurveObject[], path2: string | CurveObject[]): iterType[];
export declare function pathIntersectionNumber(path1: string | CurveObject[], path2: string | CurveObject[]): number;
export declare function isPointInsideClosedPath(path: string, x: number, y: number): boolean;
export declare function pathBBox(pathString: string): any;
export declare type Attr = Pick<BBox, 'x' | 'y'> & {
    X: number;
    Y: number;
    bx: number;
    by: number;
    qx: number | null;
    qy: number | null;
    x: number;
    y: number;
};
export declare function path2curve(pathString: string | CurveObject[], path2?: string): CurveObject[];
export {};
