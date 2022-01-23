const AWS = require("aws-sdk");
const { list_add } = require("../common/list_add");
const { list_remove } = require("../common/list_remove");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
const Formatting = require("../common/Formatting");
const { updateSingle } = require("../common/update");
var documentClient = new AWS.DynamoDB.DocumentClient();

const shouldSendMessage = (user) => {};

exports.handler = async (event) => {
  const params = {
    TableName: Tables.USERS,
  };
  const items = (await documentClient.scan(params)).Items;
  const members = items.filter((i) => shouldSendMessage(i));

  return Responses._200(resp);
};
