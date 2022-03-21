import { Leaf } from '@wonderlandlabs/forest'
import { makeField } from '../version_2/makeField'

const axios = {
  post (url, data) {
    return new Promise((done, fail) => {
      setTimeout(() => {
        const response = {data: {user:{...data, id: 1234}}};
        done(response);
      }, 2000);
    });
  }
}

export function makeForm() {
  return new Leaf({
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
            return 'password must be 8 or more characters'
          }
        })
      },
      selectors: {
        isReady({ username, password, status }) {
          try {
            return username.$isValid && password.$isValid && (status === 'entering');
          } catch (err) {
            console.log('error: ', err);
          }
        },
      },
      actions: {
        update(leaf, status, response) {
          leaf.do.setStatus(status);
          leaf.do.setResponse(response);
        },
        onFail(leaf, response) {
          leaf.do.update('failure', response.data ? response.data : 'error')
        },
        onResponse(leaf, postResponse) {
          if (postResponse.data && postResponse.data.user) {
            leaf.do.update('success', postResponse.data.user)
          } else if (postResponse.data && postResponse.data.error) {
            leaf.do.update('failure', postResponse.data.error)
          } else {
            leaf.do.update('failure', 'error')
          }
        },
        submit(leaf) {
          if (!leaf.$$.get('$isReady')) {
            return
          }
          leaf.do.setStatus('sending')
          axios.post('/api/login', {
            username: leaf.value.username.value,
            password: leaf.value.password.value
          })
            .then(leaf.do.onResponse)
            .catch(leaf.do.onFail)
        },
        reset(leaf) {
          leaf.next({
            status: 'entering',
            response: null
          });
          leaf.branch('username').do.reset();
          leaf.branch('password').do.reset();
        }
      }
    }
  )
}
