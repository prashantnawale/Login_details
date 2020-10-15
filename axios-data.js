import  axios  from 'axios';

const instance= axios.create({

  baseURL:'https://logindetails-6c98a.firebaseio.com/'

});

export default instance;