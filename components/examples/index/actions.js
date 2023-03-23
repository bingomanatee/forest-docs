const { Forest } = require("@wonderlandlabs/forest")

const pointValueActions = {
  double: (leaf) => leaf.value = 2 * leaf.value,
  halve: (leaf) => leaf.value = leaf.value / 2
}

const point = new Forest({
  $value: { x: 0, y: 0 },
  children: {
    x: { $value: 0, type: 'number', actions: pointValueActions },
    y: { $value: 0, type: 'number', actions: pointValueActions }
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
    console.log('value:', value)
  },
  error(err) {
    console.log('error:', err)
  }
})

point.value = { x: 10, y: 20 }
console.log('point.magnitude:', point.do.magnitude())
point.child('x').do.double()
console.log('point.magnitude:', point.do.magnitude())
point.do.offset(5, 15)

/**
 * value: { x: 0, y: 0 }
 * value: { x: 10, y: 20 }
 * value: { x: 10, y: 20 }
 * point.magnitude: 22.360679774997898
 * value: { x: 20, y: 20 }
 * value: { x: 20, y: 20 }
 * point.magnitude: 28.284271247461902
 * value: { x: 25, y: 35 }
 */
