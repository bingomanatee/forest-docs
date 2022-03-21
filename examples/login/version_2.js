import { Leaf } from '@wonderlandlabs/forest'
import { useEffect, useState } from 'react'
import { LeafInput } from './version_2/LeafInput'
import { makeField } from './version_2/makeField'

export const LoginForm2 = () => {
  const [state, setState] = useState(false)
  const [login, setLogin] = useState(null)
  useEffect(() => {

    const login = new Leaf({
        status: 'entering',
        response: null
      },
      {
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
        selectors: {
          isReady({ password, username }) {
            console.log('isValid from', password, username)
            return (password.$isValid && username.$isValid);
          },
        },
        actions: {
          reset(leaf) {
            leaf.next({
              status: 'entering',
              response: null,
            });
            leaf.branch('username').do.reset();
            leaf.branch('password').do.reset();
            leaf.do.setStatus('entering');
          }
        }
      }
    )

    const sub = login.subscribe(setState);
    setLogin(login)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  if (!(state && login)) {
    return ''
  }

  return <>
    <div className='login-box'>
      <div className='flex-item'>
        <LeafInput branch={login.branch('username')} status={state.status} />
        <LeafInput branch={login.branch('password')} status={state.status} />
      </div>
      <div className='flex-item'>
        <button type='submit' disabled={!state.$isReady}>Log In</button>
        <button type='reset' onClick={login.do.reset}>Reset</button>
      </div>
    </div>
    <pre>
       {JSON.stringify(state, true, 3)}
     </pre>
  </>
}
