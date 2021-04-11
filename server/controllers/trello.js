const { gatherList } = require('../helpers/trello');
const { removeUnwanted, processValues } = require('../helpers/data_processor');

const webhookReceiver = ({ action }) => {
    switch(action.data.list) {
        case undefined:
            const listJSON = gatherList(action.data.list.id);
            const processed = processValues(removeUnwanted(listJSON));
            break
        default:
            const listBeforeJSON = gatherList(action.data.listBefore.id);
            const listAfterJSON = gatherList(action.data.listAfter.id);
            break
    }
}

module.exports = {
    webhookReceiver,
}