const fs = require('fs');

const inputFile = './users.json';
const outputFile = './out.json';

const readable = fs.createReadStream(inputFile);
const writable = fs.createWriteStream(outputFile);