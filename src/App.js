import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  authenticateUser = () => {
    this.API_KEY = process.env.REACT_APP_API_KEY;
    window.Trello.setKey(this.API_KEY);
    window.Trello.authorize({
      type: 'popup',
      name: 'Getting Started Application',
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
  axios.get('https://api.trello.com/1/boards/9khsMGic/lists', {
    params: {
        key: this.API_KEY,
        token: this.userToken,
    }
  })
  .then(({ data }) => {
    axios.get(`https://api.trello.com/1/lists/${data[0].id}/cards?`, {
      params: {
        key: this.API_KEY,
        token: this.userToken,
      }
    })
    .then(({ data }) => {
      data.map((card) => {
        console.log(card.name);
      });
    })
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
