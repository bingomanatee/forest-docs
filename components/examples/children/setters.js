const { Forest } = require('@wonderlandlabs/forest')


const rect = new Forest({
  $value: {}, children: {
    ul: { $value: { x: 0, y: 0 } },
    br: {
      $value: {}, children: {
        x: { $value: 10 },
        y: { $value: 10 }
      }
    }
  }
})

rect.subscribe(console.log)

rect.do.set_ul({ x: -10, y: -10 })
rect.do.set_br({ x: 10, y: 30 })
rect.child('br').child('y').value = 50

/*

{ ul: { x: 0, y: 0 }, br: { x: 10, y: 10 } }
{ ul: { x: -10, y: -10 }, br: { x: 10, y: 10 } }
{ ul: { x: -10, y: -10 }, br: { x: 10, y: 30 } }

 */
