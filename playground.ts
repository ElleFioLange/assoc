class Item {
  name = "Item name";
}

class Test {
  a: Map<string, Item>;

  constructor(a: Map<string, Item>) {
    this.a = a;
  }

  copy() {
    const copy = new Test(this.a);
    return copy;
  }
}

const item = new Item();
const test0 = new Test(new Map([["test", item]]));
const test1 = test0.copy();

console.log(test0);
console.log(test1);

test1.a.get("test").name = "eifjeifje";

console.log(test0);
console.log(test1);