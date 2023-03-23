import { useEffect, useState } from 'react'
import loginState from './loginState'
import style from '../LoginForm.module.scss'

const LoginForm = () => {
  const [formState, setFormState] = useState({})
  /*
 formState will have the following structure:

 {
    username: {fieldValue: string},
    password: {fieldValue: string},
    disabled: boolean
}

*/
  const [forest, setForest] = useState({}) // a Forest instance

  useEffect(() => {
    const forest = loginState()
    setForest(forest)
    // express state changes using an Observer pattern to our local hooks.
    const sub = forest.subscribe((value) => {
      console.log('forest value is now ', value)
      setFormState(value)
    })
    // see RxJS observable pattern for notes on observers
    return () => sub.unsubscribe()
  }, []) // executed once on first init.

  if (!(forest && forest.do)) {
    return ''
  } // if for some reason the forest is not created wait for it to be, and render nothing

  return (
    <section className={style['login-form']}>
      <form>
        <div className={style['form-row']}>
          <label>Username</label>
          <input type="text" value={formState.username.fieldValue}
                 autoComplete="off"
                 data-lpignore="true"
                 onChange={forest.child('username').do.update}/>
        </div>
        <div className={style['form-row']}>
          <label>password</label>
          <input type="password" value={formState.password.fieldValue}
                 autoComplete="off"
                 data-lpignore="true"
                 onChange={forest.child('password').do.update}/>
        </div>
        <div className={[style['form-row'], style['form-button-row']].join(' ')}>
          {/* shorthand for `forest.do.submit` */}
          <button disabled={formState.disabled} onClick={forest.do.submit} type="submit">Log In</button>
        </div>
      </form>
    </section>
  )
}

export default LoginForm
