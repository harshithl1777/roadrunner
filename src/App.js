import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {


  authenticateUser = () => {
    this.API_KEY = process.env.REACT_APP_API_KEY;
    window.open(`https://trello.com/1/authorize?response_type=token&key=${this.API_KEY}&scope=read&expiration=never&name=Roadrunner`);
}

test = () => {
  axios.get('https://api.trello.com/1/boards/9khsMGic/lists', {
    params: {
        key: this.API_KEY,
        token: this.token.value,
    }
  })
  .then(({ data }) => {
    axios.get(`https://api.trello.com/1/lists/${data[0].id}/cards?`, {
      params: {
        key: this.API_KEY,
        token: this.token.value,
      }
    })
    .then(({ data }) => {
      data.map((card) => {
        console.log(card.name);
      });
    })
  });
}

  render() {
    return (
      <div className="App">
        <button onClick={this.authenticateUser}>Authenticate User</button>
        <input ref={ref => this.token = ref} />
        <button onClick={this.test}>Test</button>
      </div>
    );
  }

}

export default App;
