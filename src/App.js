import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  authenticateUser = () => {
    this.API_KEY = process.env.REACT_APP_TRELLO_API_KEY;
    window.Trello.setKey(this.API_KEY);
    window.Trello.authorize({
      type: 'popup',
      name: 'Roadrunner',
      persist: false,
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
    console.log(this.userToken);
  }

  authFailure = () => {
    console.log('Failed');
  }


  getLists = () => {
    axios.get(`https://api.trello.com/1/lists/600f186d86b7d8428cfded76/cards`, {
        params: {
            id: '600f186d86b7d8428cfded76',
            key: process.env.REACT_APP_TRELLO_API_KEY,
            token: this.userToken,
        }
    })
    .then(({ data }) => {
        data.map(card => console.log(card.labels));
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.authenticateUser}>Authenticate User</button>
        <button onClick={this.getLists}>Get Lists</button>
      </div>
    );
  }

}

export default App;
