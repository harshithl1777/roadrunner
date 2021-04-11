const axios = require('axios');

const gatherList = (listID) => {
    axios.get(`https://api.trello.com/1/lists/${listID}/cards`, {
        params: {
            id: listID,
            key: process.env.TRELLO_API_KEY,
            token: process.env.DEV_TOKEN,
        }
    })
    .then(({ data }) => {
        console.log(data);
        return data;
    })
    .catch(err => console.log(err));
}

module.exports = {
    gatherList,
};
