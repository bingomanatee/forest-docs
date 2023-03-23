import { Forest } from '@wonderlandlabs/forest'

/*
formState will have the following structure:

{
  username: {fieldValue: string, error: string},
  password: {fieldValue: string, error: string},
  disabled: boolean
}

*/

export default () => {

  /**
   * this is a "fragment" that defines a configuration for any field child
   */
  const field = (inputTest) => ({
    $value: { fieldValue: '', feedback: '' },
    actions: {
      testInput: (leaf) => {
          const feedback = inputTest(leaf.value.fieldValue);
          leaf.do.set_feedback(feedback);
      },
      update: (leaf, e) => {
        leaf.do.set_fieldValue(e.target.value)
        leaf.do.set_feedback('') // resetting feedback (if any) from failed submissions
        leaf.parent.do.set_feedback('') // removing any leftover feedback from previous submit
      }
    }
  })

  return new Forest({
    $value: { sending: false, feedback: '', loggedIn: false },
    children: {
      username: field((input) => input ? '' : 'Required'),
      password: field((input) => input ? '' : 'Required')
    },
    actions: {
      canSubmit(leaf) {
        return (!leaf.value.username.feedback) && (!leaf.value.password.feedback);
      },
      success: (leaf) => {
        leaf.do.set_loggedIn(true)
        leaf.do.set_feedback('You have successfully logged in ')
      },
      failure: (leaf) => {
        leaf.do.set_loggedIn(false)
        leaf.do.set_feedback('Your username and password are not correct')
      },
      submit: (leaf, event) => {
        event.preventDefault();
        leaf.child('username').do.testInput()
        leaf.child('password').do.testInput()
        if (leaf.do.canSubmit()) {
          leaf.do.set_sending(true);
          const data = {
            username: leaf.value.username.fieldValue,
            password: leaf.value.password.fieldValue
          }
          setTimeout(() => {
            leaf.do.set_sending(false);
            if (data.username === 'Test User' && data.password === 'password') {
              leaf.do.success()
            } else {
              leaf.do.failure()
            }
          }, 2000)
        }
        return false;
      }
    }
  })
}
