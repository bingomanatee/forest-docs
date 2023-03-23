const { Forest } = require('@wonderlandlabs/forest')


const STATES = ['ready', 'sending', 'done', 'error']
const cart = new Forest({
  $value: {
    cart: [],
    status: 'ready',
  },
  children: {
    status: {
      $value: 'ready',
      test: (value) => {
        if (!(STATES.includes(value))) {
          return `invalid state set attempt: ${value} is an invalid state`
        }
      }
    }
  },
  actions: {
    changeAndSubmit(leaf, newState = 'sending') {
      console.log('-- starting changeAndSubmit:', newState)
      leaf.do.set_status(newState);
      return leaf.do.submit();
    },
    submit: async (leaf) => {
      console.log('----- starting submit');
      const { cart } = leaf.value
      return new Promise((done, fail) => {
        setTimeout(() => {
          if (leaf.value.cart.length > 3) {
            leaf.do.set_status('error');
            fail('api failure: too many items in cart (' + cart.length + '): 3 max.');
          } else {
            done({ saved: true, cart })
            if (leaf.value.state !== 'error') {
              leaf.do.set_status('done');
            }
          }
        }, 500)
      })
    }
  }
})

cart.subscribe({
  next(v) {
    console.log('');
    console.log('>>> cart:', v)
    console.log('');
  },
  error(err) {
    console.log('fatal error:', err.message)
  }
})

cart.do.set_cart(['apples', 'oranges'])
cart.do.changeAndSubmit()
  .then((result) => console.log('result:', result))
  .catch((err) => {
    console.log('cart error:', err)
  })
console.log('main thread (sent cart)');

setTimeout(() => {
  try {
    cart.do.set_cart(['olives', 'peppers', 'rhubarb', 'apples', 'oranges'])
    cart.do.changeAndSubmit()
      .then((result) => console.log('cart 2 ASYNC result:', result))
      .catch((err) => console.log('cart 2 ASYNC error:', err));
  } catch (err) {
    console.log('second send trapped SYNC error:', err.message);
  }

  console.log('main thread (sent cart again)');

  setTimeout(() => {
    cart.do.set_cart(['apples', 'oranges']);
    try {
      console.log('in timeout (sending a third time)');
      cart.do.changeAndSubmit('crap 3 state')
        .then((result) => console.log('cart 3 ASYNC result:', result))
        .catch((err) => console.log('cart 3  ASYNC error:', err.message))
      console.log('in timeout (sent cart a third time (with errors))');
    } catch (err) {
      console.log('--- crap 3 state error trapped SYNC error:', err.message);
    }
  }, 1500);
}, 1500);

/*

>>> cart: { cart: [], status: 'ready' }


>>> cart: { cart: [ 'apples', 'oranges' ], status: 'ready' }

-- starting changeAndSubmit: sending
----- starting submit

>>> cart: { cart: [ 'apples', 'oranges' ], status: 'sending' }

main thread (sent cart)

>>> cart: { cart: [ 'apples', 'oranges' ], status: 'done' }

result: { saved: true, cart: [ 'apples', 'oranges' ] }

>>> cart: {
  cart: [ 'olives', 'peppers', 'rhubarb', 'apples', 'oranges' ],
  status: 'done'
}

-- starting changeAndSubmit: sending
----- starting submit

>>> cart: {
  cart: [ 'olives', 'peppers', 'rhubarb', 'apples', 'oranges' ],
  status: 'sending'
}

main thread (sent cart again)

>>> cart: {
  cart: [ 'olives', 'peppers', 'rhubarb', 'apples', 'oranges' ],
  status: 'error'
}

cart 2 ASYNC error: api failure: too many items in cart (5): 3 max.

>>> cart: { cart: [ 'apples', 'oranges' ], status: 'error' }

in timeout (sending a third time)
-- starting changeAndSubmit: crap 3 state
test of  invalid state set attempt: crap 3 state is an invalid state returned invalid state set attempt: crap 3 state is an invalid state
--- crap 3 state error trapped SYNC error: invalid state set attempt: crap 3 state is an invalid state

 */
