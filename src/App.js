import React, { Component } from 'react';

class App extends Component {
  authSuccess = () => {
    console.log('Successful authentication');
  };
  
  authenticationFailure = () => {
    console.log('Failed authentication');
  };

  authenticateUser = () => {
    window.Trello.authorize({
      type: 'popup',
      name: 'Roadrunner',
      scope: { read: 'true', write: 'true' },
      expiration: 'never',
      success: this.authSuccess,
      error: this.authFailure
    });
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
