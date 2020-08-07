# curve utils

## Installation

```shell
npm install curve-utils --save
```

```html
<script src="js/curveUtils.js"></script>
```

## Features

curve functions.you can get the little step of the given path,so you can draw the animated curve.
贝塞尔曲线函数,画贝塞尔曲线动画

## Methonds

### `getTotalLength`: get total length of the curve

```typescript
getTotalLength(pathArr: number[]): number;
```

pathArr like [mx,my,c1,c2,c3,c4,c5,c6,c1,c2,c3,c3,c4,c5,c6],The first two value is the start points,You can enter multiple curve path later.

### `getPointAtLength`: get point at the given length along the given path

```typescript
getPointAtLength(pathArr: number[], length: number): {
x: number;
y: number;
};
```

### `getSubpathsAtLength`:get the subpath of a given path at the given range[0,1];

```typescript
getSubpathsAtLength(pathArr: number[], ratio: number):
[[mx:number,my:number],...[c1x:number,c1y:number,c2x:number,c2y:number,x2:number,y2:number]];
```

### `bezierCurve`:get the curve path of a given bezierCurve path at the given range[0,1];

```typescript
bezierCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, t?: number):
[x1:number,y1:number,c1x:number,c1y:number,c2x:number,c2y:number,x2:number,y2:number];
```

### `quadraticCurve`:get the curve path of a given quadraticCurve path at the given range[0,1];

```typescript
quadraticCurve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, t?: number):
[x1:number,y1:number,c1x:number,c1y:number,c2x:number,c2y:number,x2:number,y2:number];
```
