import {Leaf} from '@wonderlandlabs/forest';
import { useEffect, useState } from 'react'

const axios = {
  post (url, data) {
    return new Promise((done, fail) => {

    });
  }
}

export const LoginForm = () => {
  const [state, setState] = useState(false);
  const [login, setLogin] = useState(null);
  useEffect(() => {

    const login = new Leaf({
        username: '',
        password: '',
        status: 'entering',
      },
      {
        debug: 3,
        selectors: {
            isReady({ username, password }) {
            return !!(password && username);
          },
        },
        actions: {
          reset(leaf)  {
            leaf.next({
              password: '',
              status: 'entering',
            });
          },
        }
      }
    )

    const sub = login.subscribe((value) => {
      console.log('>>> setting value as ', value);
      setState(value);
    });

    setLogin(login);

    return () => {
      sub.unsubscribe();
    }
  }, []);

  if (!(state && login)) return '';

  console.log('rendering with state:', state);
  return <>
   <div className="login-box">
    <div className="flex-item">
      <h2>Username</h2>
      <input type="text" value={state.username} onChange={(event) => {
        login.do.setUsername(event.target.value);
        console.log('un: login is now ', login.toJSON(true));
      }} />
      <h2>Password</h2>
      <input type="text" value={state.password} onChange={(event) => login.do.setPassword(event.target.value)} />
    </div>
     <div className="flex-item">
       <button type="submit" disabled={!state.$isReady}>Log In</button>
       <button type="reset" onClick={login.do.reset}>Reset</button>
     </div>
  </div>
     <pre>
       {JSON.stringify(state, true, 3)}
     </pre>
     </>
}
