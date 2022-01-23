const AWS = require("aws-sdk");
const { list_add } = require("../common/list_add");
const { list_remove } = require("../common/list_remove");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
const Formatting = require("../common/Formatting");
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const sub = Formatting.getSub(event);
  const eventBody = Formatting.ensureObject(event.body);
  const resp = await list_remove(Tables.USERS, [{ sub: sub }], "messages", [
    eventBody.message,
  ]);
  console.log(resp);
  //   const resp = { message: "youre doing great" };
  return Responses._200(resp);
};
