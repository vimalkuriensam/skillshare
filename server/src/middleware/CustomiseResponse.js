const moment = require("moment");

const CustomiseResponse = (req, res, next) => {
  const send = res.send;
  res.send = function (body) {
    if (!body["code"]) {
      data = JSON.parse(JSON.stringify(body));
      body["code"] = res.statusCode;
      body["timestamp"] = moment.now();
      body["path"] = req.originalUrl;
      body["data"] = { ...data };
      Object.keys(data).forEach((key) => delete body[key]);
    }
    send.call(res, body);
  };
  next();
};

module.exports = CustomiseResponse;
