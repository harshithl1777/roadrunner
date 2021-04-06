const dfd = require('danfojs-node');
const axios = require('axios');
const fs = require('fs');

const data = require('./data');
const { map } = require('./data');
const { create } = require('domain');

const removeUnwanted = (data) => {
    return data.map(({ name, desc, labels }) => {
        return { name, desc, labels };
    });
}

const processValues = (data) => {
    
}

const createCSV = (data) => {
    fs.appendFile('data.csv', data, (err) => console.log(err));
}

// const removed = removeUnwanted(data);
// console.log(removed);
// const df = new dfd.DataFrame(removed);
// df.to_csv('./data.csv').then((csv) => console.log(csv)).catch(err => console.log(err));

module.exports = {
    removeUnwanted,
    processValues
}
