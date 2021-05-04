const axios = require('axios');

const gatherCards = async (listID, token) => {
    const { data } = await axios.get(`https://api.trello.com/1/lists/${listID}/cards`, {
        params: {
            id: listID,
            key: 'e1b23f1d39ff82efd37ac98ef2d87ef9',
            token,
        }
    });
    return data;
}

const createWebhookTrello = async (token, modelID) => {
    const { data } = await axios.post('https://api.trello.com/1/webhooks', {
        key: process.env.TRELLO_API_KEY,
        token,
        description: 'Roadrunner webhook',
        callbackURL: `${process.env.API_URL}/api/receiver?listID=${modelID}`,
        idModel: modelID,
    });
    return data.id;
}

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

const deleteWebhooksTrello = async (ids, token) => {
    let successes = [];
    let issues = [];
    await asyncForEach(ids, async (id) => {
        try {
            const { status } = await axios.delete(`https://api.trello.com/1/webhooks/${id}`, {
                data: {
                    key: process.env.TRELLO_API_KEY,
                    token
                }
            });
            if (status === 200) successes.push(id);
        } catch(err) {
            console.log(err);
            issues.push(1);
        }
    });
    return [successes, issues];
}

const gatherLists = async (board) => {
    const { data, err } = await axios.get(`https://api.trello.com/1/boards/9khsMGic/lists`, {
        params: {
            id: '9khsMGic',
            key: 'e1b23f1d39ff82efd37ac98ef2d87ef9',
            token: 'aa3876aea7ccd1dc325d3e3e4e2954dd24c2f94f7b829618e5fba81b24f3eba5',
        }
    });
    if (err) console.log(err);
    console.log(data);
}


module.exports = {
    gatherCards,
    createWebhookTrello,
    deleteWebhooksTrello
};
