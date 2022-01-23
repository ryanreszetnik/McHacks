const AWS = require("aws-sdk");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
const Formatting = require("../common/Formatting");
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const sub = Formatting.getSub(event);
  const params = {
    Key: { sub: sub },
    TableName: Tables.USERS,
  };
  let resp = (await documentClient.get(params).promise()).Item;
  resp = {
    ...resp,
    messages: resp.messages ? resp.messages.values : [],
  };
  console.log(resp);
  return Responses._200(resp);
};
