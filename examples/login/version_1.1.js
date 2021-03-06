import {Leaf} from '@wonderlandlabs/forest';

const axios = {
  post (url, data) {
    return new Promise((done, fail) => {

    });
  }
}

const login = new Leaf({
    username: '',
    password: '',
    status: 'entering',
    response: null
  },
  {
    actions: {
      isReady(leaf) {
        return leaf.value.password && leaf.value.username;
      },
      onFail(leaf, response) {
        leaf.do.update('failure', response.data ? response.data : 'error');
      },
      onResponse(leaf, postResponse) {
        if (postResponse.data && postResponse.data.user) {
          leaf.do.update('success', postResponse.data.user);
        } else if (postResponse.data && postResponse.data.error) {
          leaf.do.update('failure', postResponse.data.error);
        } else {
          leaf.do.update('failure','error');
        }
      },
      forOutput(leaf) {
        return {
          username: leaf.value.username.value,
          password: leaf.value.password.value
        }
      },
      submit (leaf) {
        if (!leaf.do.isReady()) return;
        if (leaf.value.status !== 'entering') return;
        leaf.do.setStatus('sending');
        axios.post('/api/login', leaf.do.forOutput())
          .then(leaf.do.onResponse)
          .catch(leaf.do.onFail);
      },
      update(leaf, status, response) {
        leaf.do.setStatus(status);
        leaf.do.setResponse(response);
      },
      reset(leaf)  {
        leaf.next({
          password: '',
          status: 'entering',
          response: null
        });
      },
    }
  }
)
