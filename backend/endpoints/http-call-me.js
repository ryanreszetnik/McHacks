const AWS = require("aws-sdk");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
const Credentials = require("../common/constants");
const Formatting = require("../common/Formatting");
const client = require("twilio")(Credentials.accountSid, Credentials.authToken);
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log("Got event", event);
  const sub = Formatting.getSub(event);
  console.log("Got sub", sub);
  const params = {
    Key: { sub: sub },
    TableName: Tables.USERS,
  };
  const resp = (await documentClient.get(params).promise()).Item;
  console.log("Got user", resp);
  await client.calls.create({
    twiml: `<Response><Say>Hi ${resp.username} you are doing amazing today don't let anything slow you down!</Say></Response>`,
    to: resp.phone_number,
    from: "+12264076113",
  });

  return Responses._200(resp);
};
