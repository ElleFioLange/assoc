const a = [1, 2, 3, undefined, null, 5, 6];

const b = a.map((i) => i ? i : undefined);

console.log(b);