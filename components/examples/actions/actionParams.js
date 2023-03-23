const { Forest } = require('@wonderlandlabs/forest')

const count = new Forest({
  $value: { count: 0 },
  children: {
    increment: {
      $value: 1,
      type: true,
      test: (value) => {
        if (value === 0) {
          return 'increment cannot be set to zero'
        }
        return false
      }
    }
  },
  actions: {
    inc(leaf, incr = undefined) {
      if (incr !== undefined) {
        leaf.do.set_increment(incr)
      }
      leaf.do.set_count(leaf.value.count + leaf.value.increment)
      return leaf.value.count
    }
  }
})
count.subscribe(console.log)
count.do.inc()
count.do.inc(3)
count.do.inc()
count.do.inc()
try {
  // DO NOT pass leaf in as the first argument manually -- this is an error.
  count.do.inc(count, 2)
} catch (err) {
  console.log('parameter error:', err.message)
}
count.do.inc(2)
count.do.inc()

/*

{ count: 0, increment: 1 }
{ count: 1, increment: 1 }
{ count: 4, increment: 3 }
{ count: 7, increment: 3 }
{ count: 10, increment: 3 }
parameter error: cannot add value of type object to leaf root:increment:11f7e64b-5877-4615-87df-a151a08f2887 (type number)
{ count: 12, increment: 2 }
{ count: 14, increment: 2 }

 */
