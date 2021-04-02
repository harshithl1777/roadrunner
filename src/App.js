import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  authenticateUser = () => {
    this.API_KEY = process.env.REACT_APP_TRELLO_API_KEY;
    window.Trello.setKey(this.API_KEY);
    window.Trello.authorize({
      type: 'popup',
      name: 'Roadrunner',
      scope: {
        read: 'true',
        write: 'true' },
      expiration: 'never',
      success: this.authSuccess,
      error: this.authFailure
    });
  }

authSuccess = () => {
  this.userToken = window.Trello.token();
    console.log(process.env.REACT_APP_PRIMARY_ROUTE_KEY);
  axios.post(`${process.env.REACT_APP_API_URL}/webhook`, 
    { token: this.userToken },
    { headers:  { 'token': `${process.env.REACT_APP_PRIMARY_ROUTE_KEY}` }
  })
  .then(({ data }) => {
    alert(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

authFailure = () => {
  console.log('Failed');
}


  render() {
    return (
      <div className="App">
        <button onClick={this.authenticateUser}>Authenticate User</button>
      </div>
    );
  }

}

export default App;
