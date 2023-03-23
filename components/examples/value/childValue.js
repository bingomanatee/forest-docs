const { Forest } = require('@wonderlandlabs/forest')

const point = new Forest({
  $value: { x: 0 },
  children: { y: 0, z: 0 }
})

point.subscribe({
  next(value) {
    console.log('---')
    console.log('forest value:', value, 'root local value:', point.localValue);
    console.log('y child leaf value: ', point.child('y').value);
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
point.value = { x: 10, y: 20, z: 30 }
point.child('z').value = 'stringy stringy'
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
---
forest value: { x: 10, y: 20, z: 30 } root local value: { x: 10, y: 20, z: 30 }
y child leaf value:  20
z child leaf value:  30
---
forest value: { x: 10, y: 20, z: 'stringy stringy' } root local value: { x: 10, y: 20, z: 30 }
y child leaf value:  20
z child leaf value:  stringy stringy

 */
