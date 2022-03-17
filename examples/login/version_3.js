import { useEffect, useState } from 'react'
import { LeafInput } from './version_3/LeafInput'
import { makeForm } from './version_3/makeForm'

export const LoginForm3 = () => {
  const [state, setState] = useState(false)
  const [login, setLogin] = useState(null)
  useEffect(() => {

    const login = makeForm();

    const sub = login.subscribe({
    next (value){
      const state = { ...value, isReady: login.do.isReady() }
      setState(state)
    },
  })

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
        <LeafInput status={state.status} branch={login.branch('username')} />
        <LeafInput status={state.status} branch={login.branch('password')} />
      </div>
      <div className='flex-item'>
        <button type='submit' onClick={login.do.submit} disabled={!login.do.isReady()}>Log In</button>
        <button type='reset' onClick={login.do.reset}>Reset</button>
      </div>
    </div>
    {state.status === 'success' && <div className="message center">Saved data with id = {state.response.id}</div>}
    {state.status === 'error' && <div className="message error center">Failed to save user; reset and try again</div>}
    <pre>
       {JSON.stringify(state, true, 3)}
     </pre>
  </>
}
