const AWS = require("aws-sdk");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
const Formatting = require("../common/Formatting");
const Credentials = require("../common/constants");
const client = require("twilio")(Credentials.accountSid, Credentials.authToken);
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const sub = Formatting.getSub(event);
  const params = {
    Key: { sub: sub },
    TableName: Tables.USERS,
  };
  const resp = (await documentClient.get(params).promise()).Item;

  await client.messages
    .create({
      body: `Hi ${resp.username} - you are doing great <3`,
      from: "+12264076113",
      to: resp.phone_number,
    })
    .then((message) => console.log(message.sid));
  //.then(call => console.log(call.sid));\

  return Responses._200(resp);
};
