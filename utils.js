const fs = require('fs');

const saveFile = (data, fileName) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data));
  } catch (err) {
    console.log(err.message);
    throw new Error(err);
  }
};

const readFile = (fileName) => {
  try {
    const data = fs.readFileSync(fileName, 'utf-8');
    return data && JSON.parse(data);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  saveFile,
  readFile,
};
