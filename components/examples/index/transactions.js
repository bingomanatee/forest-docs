const { Forest } = require("@wonderlandlabs/forest")

const pointValueActions = {
  double: (leaf) => leaf.value = 2 * leaf.value,
  halve: (leaf) => leaf.value = leaf.value / 2
}

const point = new Forest({
  $value: { },
  children: {
    x: { $value: 0, type: true, actions: pointValueActions },
    y: { $value: 0, type: true, actions: pointValueActions }
  },
  actions: {
    double(leaf) {
      leaf.child('x').do.double()
      leaf.child('y').do.double()
    },
    magnitude(leaf) {
      const { x, y } = leaf.value
      return (x ** 2 + y ** 2) ** 0.5
    },
    offset(leaf, x, y) {
      leaf.do.set_x(leaf.value.x + x)
      leaf.do.set_y(leaf.value.y + y)
    }
  }
})

point.subscribe({
  next(value) {
    console.log('next value:', value)
  },
  error(err) {
    console.log('error:', err)
  }
})

point.value = { x: 10, y: 20 }
console.log('point.magnitude:', point.do.magnitude())
point.child('x').do.double();

try {
  point.value = {x: 40, y: 'fifty'}
} catch (err) {
  console.log('error:', err.message);
}
console.log('value unchanged:', point.value);

try {
  point.do.offset(10, 'six');
} catch (err) {
  console.log('error in offset', err.message);
}
console.log('value STILL unchanged:', point.value);
console.log('point.magnitude:', point.do.magnitude())
point.do.offset(5, 15)

/**
 * /Users/davidedelhart/.nvm/versions/node/v16.18.0/bin/node /Users/davidedelhart/Documents/repos/forest2-docs/lib/examples/index/transactions.js
 * next value: { x: 0, y: 0 }
 * next value: { x: 10, y: 20 }
 * point.magnitude: 22.360679774997898
 * next value: { x: 20, y: 20 }
 * error: cannot add value of type string to leaf root:y:0fab282c-9fc2-4f17-a97b-775c704303c0 (type number)
 * value unchanged: { x: 20, y: 20 }
 * error in offset cannot add value of type string to leaf root:y:0fab282c-9fc2-4f17-a97b-775c704303c0 (type number)
 * value STILL unchanged: { x: 20, y: 20 }
 * point.magnitude: 28.284271247461902
 * next value: { x: 25, y: 35 }
 */
