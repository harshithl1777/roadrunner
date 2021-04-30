const authorizeClient = (success, error) => {
    const API_KEY = process.env.REACT_APP_TRELLO_API_KEY;
    let token = null;
    window.Trello.setKey(API_KEY);
    window.Trello.authorize({
      type: 'popup',
      name: 'Roadrunner',
      persist: false,
      scope: {
        read: 'true',
        write: 'true' },
      expiration: 'never',
      success,
      error
    });
    return token;
}

export default authorizeClient;