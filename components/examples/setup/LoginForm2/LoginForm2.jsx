import { useEffect, useState } from 'react'
import loginState from './loginState2'
import style from '../LoginForm.module.scss'

const LoginForm2 = () => {

  const [formState, setFormState] = useState({})
  /*
 formState will have the following structure:

 {
    username: {fieldValue: string, feedback: string},
    password: {fieldValue: string, feedback: string},
    sending: boolean
    loggedIn: boolean
    feedback: string
}

*/
  const [forest, setForest] = useState({})

  useEffect(() => {
    const forest = loginState()
    setForest(forest)
    const sub = forest.subscribe((value) => {
      console.log('forest value is now ', value)
      setFormState(value)
    })
    return () => sub.unsubscribe()
  }, [])
  if (!(forest && forest.do)) {
    return ''
  }
  return (
    <section className={style['login-form']}>
      <form> {/* shorthand for `forest.do.submit` */}
        <div className={style['form-row']}>
          <label>Username {
            !formState.username.feedback ? '' : (
              <span className={style['feedback']}>
                {formState.username.feedback}
              </span>
            )
          }</label>
          <input type="text" value={formState.username.fieldValue}
                 autoComplete="off"
                 data-lpignore="true"
                 disabled={formState.sending}
                 onChange={forest.child('username').do.update}/>

        </div>

        <div className={style['form-row']}>
          <label>Password {
            !formState.password.feedback ? '' : (
              <span className={style['feedback']}>
                {formState.password.feedback}
              </span>
            )
          }</label>
          <input type="password" value={formState.password.fieldValue}
                 autoComplete="off"
                 data-lpignore="true"
                 disabled={formState.sending}
                 onChange={forest.child('password').do.update}/>

        </div>

        <div className={[style['form-row'], style['form-button-row']].join(' ')}>
          <button disabled={formState.sending} onClick={forest.do.submit} type="submit">Log In</button>
        </div>
        {
          !formState.feedback ? '' : (
            <p className={[style['feedback'], formState.loggedIn ? style['feedback__success'] : ''].join(' ')}>
              {formState.feedback}
            </p>
          )
        }
        {
          !formState.sending ? '' : (
            <p className={style['sending']}>Sending form data</p>
          )
        }
      </form>
    </section>
  )
}

export default LoginForm2
