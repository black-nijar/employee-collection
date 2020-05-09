import axios from 'axios';

const setAuthToken = token => {
  if (token) {
   // console.log('TOKEN :',token)
    axios.defaults.headers.common['token'] = token;
  } else {
    delete axios.defaults.headers.common['token'];
  }
};

export default setAuthToken;