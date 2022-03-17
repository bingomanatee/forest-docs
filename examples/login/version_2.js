import { Leaf } from '@wonderlandlabs/forest'
import { useEffect, useState } from 'react'
import { LeafInput } from './version_2/LeafInput'

function makeField(title, type, validator) {
  return new Leaf({
      title,
      value: '',
      type,
      touched: false
    },
    {

      actions: {
        update(leaf, value) {
          leaf.do.setValue(value)
          leaf.do.setTouched(true);
        },
        isValid(leaf) {
          return !leaf.do.errors()
        },
        isEmpty(leaf) {
          return !leaf.value.value
        },
        errors(leaf) {
          if (leaf.do.isEmpty()) {
            return 'must have a value'
          }
          return validator(leaf.value.value)
        }
      }
    })
}

export const LoginForm2 = () => {
  const [state, setState] = useState(false)
  const [login, setLogin] = useState(null)
  useEffect(() => {
    console.log('making new login');
    const login = new Leaf({
        status: 'entering',
        response: null
      },
      {
        debug: true,
        branches: {
          username: makeField('User Name', 'text', (value) => {
            if (/[\s]+/.test(value)) {
              return 'username cannot have spaces'
            }
          }),
          password: makeField('Password', 'password', (value) => {
            if (/[\s]+/.test(value)) {
              return 'password cannot have spaces'
            }
            if (value.length < 8) {
              return 'password must be 8 or more characters';
            }
          })
        },
        actions: {
          isReady(leaf) {
            if (!(leaf.value.password.value && leaf.value.username.value)) return false;
            if (!leaf.branch('username').do.isValid() || !leaf.branch('password').do.isValid()) {
              return false;
            }
            return true;
          },
          reset(leaf) {
            leaf.next({
              status: 'entering',
              response: null,
              password: {value: '', touched: false},
              username: {value: '', touched: false}
            })
          }
        }
      }
    )

    const sub = login.subscribe({
    next (value){
      const state = { ...value, isReady: login.do.isReady() }
      console.log('--- update state:', state);
      setState(state)
    },
    error(err) {
      console.log('error: ', err);
    }
  })

    setLogin(login)

    return () => {
      console.log('unsubscribed');
      sub.unsubscribe()
    }
  }, [])

  if (!(state && login)) {
    return ''
  }

  return <>
    <div className='login-box'>
      <div className='flex-item'>
        <LeafInput branch={login.branch('username')} />
        <LeafInput branch={login.branch('password')} />
      </div>
      <div className='flex-item'>
        <button type='submit' disabled={!login.do.isReady()}>Log In</button>
        <button type='reset' onClick={login.do.reset}>Reset</button>
      </div>
    </div>
    <pre>
       {JSON.stringify(state, true, 3)}
     </pre>
  </>
}
