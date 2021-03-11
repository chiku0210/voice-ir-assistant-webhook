const Log = require("./models").Log;

function log(param) {
  const type = param.type;
  const message = param.message;
  const data = param.data;
  // Date is auto-inserted
  const l = new Log({
    type,
    message,
    data,
  });
}

module.exports = log;
