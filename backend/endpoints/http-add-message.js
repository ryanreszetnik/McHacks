const AWS = require("aws-sdk");
const { list_add } = require("../common/list_add");
const { list_remove } = require("../common/list_remove");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const sub = event.requestContext.authorizer.claims.sub;

  await list_remove(Tables.USERS, [{ sub: sub }], "messages", [event.body]);
  const resp = { message: "youre doing great" };
  return Responses._200(resp);
};
