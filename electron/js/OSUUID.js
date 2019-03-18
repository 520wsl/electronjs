const si = require('systeminformation');

module.exports = () => {
  return si.uuid().then(data => data.os)
};
