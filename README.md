# curve utils

## Installation

```shell
npm install curve-utils --save
```

```html
<script src="js/curveUtils.js"></script>
```

# curve

## Features

curve functions.you can get the little step of the given path,so you can draw the animated curve.
贝塞尔曲线函数,画贝塞尔曲线动画

### inputContent like inputString:"M0 0L100 0" or inputArray:[["M",0,0],["L",100,0]]

```typescript
inputString: "M0 0L100 0";
inputArray: [
  ["M", 0, 0],
  ["L", 100, 0]
];
```

## Methonds

### `path2Curve`: format the path to curve.

```typescript
path2Curve(path: inputContent): inputArray;
```

### `getTotalLength`: get total length of the curve

```typescript
getTotalLength(path: inputContent): number;
```

### `getPointAtLength`: get point at the given length along the given path

```typescript
getPointAtLength(path: inputContent, length: number): {
x: number;
y: number;
};
```

### `getSubpathsAtLength`:get the subpath of a given path at the given range[0,1];

```typescript
getSubpathsAtLength(path: string|CurveObject[], ratio: number,justStart:boolean);
```

- justStart:false;
  returns {start:string like "M0 0 C0 0 100 0 100 0",end:""}

- justStart:true;
  returns string like "M0 0 C0 0 100 0 100 0"

# martix

```typescript
let mat = martix() | new Martix(1, 0, 0, 1, 0, 0);
```

## Methonds

### translate(x,y)

### ratate(deg,x,y)

### scale(x,y,cx,cy)

### ...
