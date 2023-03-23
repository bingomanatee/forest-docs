const { Forest } = require('@wonderlandlabs/forest')

const point = new Forest({
  $value: { x: 0 },
  children: {
    y: 0, z: {
      $value: 0, type: true
    }
  },
  actions: {
    setAll(leaf, x, y, z) {
      leaf.do.set_x(x)
      leaf.do.set_y(y)
      leaf.do.set_z(z)
    }
  }
})

point.subscribe({
  next(value) {
    console.log('---')
    console.log('forest value:', value, 'root local value:', point.localValue)
    console.log('y child leaf value: ', point.child('y').value)
    console.log('z child leaf value: ', point.child('z').value)
  },
  error(err) {
    console.log('fatal error:', err.message);
  }
})

point.do.set_x(1)
point.do.set_y(2)
point.value = {}
point.child('y').value = 3
point.do.setAll(10, 20, 30)
point.value = {y: ['it was the best of times', 'it was the worst of times']}
try {
  point.child('z').value = 'stringy stringy'
} catch (err) {
  console.log('error:', err.message);
}
point.do.set_z(40);
/*
---
forest value: { x: 0, y: 0, z: 0 } root local value: { x: 0 }
y child leaf value:  0
z child leaf value:  0
---
forest value: { x: 1, y: 0, z: 0 } root local value: { x: 1 }
y child leaf value:  0
z child leaf value:  0
---
forest value: { x: 1, y: 2, z: 0 } root local value: { x: 1 }
y child leaf value:  2
z child leaf value:  0
---
forest value: { y: 2, z: 0 } root local value: {}
y child leaf value:  2
z child leaf value:  0
---
forest value: { y: 3, z: 0 } root local value: {}
y child leaf value:  3
z child leaf value:  0
---
forest value: { x: 10, y: 20, z: 30 } root local value: { x: 10 }
y child leaf value:  20
z child leaf value:  30
---
forest value: {
  y: [ 'it was the best of times', 'it was the worst of times' ],
  z: 30
} root local value: { y: [ 'it was the best of times', 'it was the worst of times' ] }
y child leaf value:  [ 'it was the best of times', 'it was the worst of times' ]
z child leaf value:  30
error: cannot add value of type string to leaf root:z:9cb75dbd-2b23-4dda-b6a8-bd2ad86a9f8c (type number)
---
forest value: {
  y: [ 'it was the best of times', 'it was the worst of times' ],
  z: 40
} root local value: { y: [ 'it was the best of times', 'it was the worst of times' ] }
y child leaf value:  [ 'it was the best of times', 'it was the worst of times' ]
z child leaf value:  40
 */
