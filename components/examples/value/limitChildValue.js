const { Forest } = require('@wonderlandlabs/forest')

const point = new Forest({
  $value: { x: 0 },
  children: {
    y: { $value: 0, type: true },
    z: {
      $value: 0, type: ['number', 'string']
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
    console.log('fatal error:', err.message)
  },
  complete() {
    console.log('game over. gohome')
  }
})

point.value = { x: 1 }
point.value = { y: 2 }
point.child('y').value = 3
try {
  point.child('y').value = 'four';
} catch (err) {
  console.log('y assignment error:', err.message);
}
point.value = { x: 10, y: 20, z: 30 }
point.child('z').value = 'stringy stringy'
try {
  point.child('z').value = [4]
} catch (err) {
  console.log('z assignment error:', err.message);
}
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
forest value: { y: 2, z: 0 } root local value: { y: 2 }
y child leaf value:  2
z child leaf value:  0
---
forest value: { y: 3, z: 0 } root local value: { y: 2 }
y child leaf value:  3
z child leaf value:  0
y assignment error: cannot add value of type string to leaf root:y:f7b4243d-a00c-436e-a9ed-ed1e76f1ed0c (type number)
---
forest value: { x: 10, y: 20, z: 30 } root local value: { x: 10, y: 20, z: 30 }
y child leaf value:  20
z child leaf value:  30
---
forest value: { x: 10, y: 20, z: 'stringy stringy' } root local value: { x: 10, y: 20, z: 30 }
y child leaf value:  20
z child leaf value:  stringy stringy
z assignment error: cannot add value of type array to leaf root:z:8fb69be4-6bfd-4278-b71a-de9fad280459 (type number or string)
 */
