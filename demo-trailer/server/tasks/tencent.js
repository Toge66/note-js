const COS = require("cos-nodejs-sdk-v5");
const config = require("../config");
const {
  tencent: { APPID, SecretId, SecretKey }
} = config;
var cos = new COS({
  SecretId,
  SecretKey
});
