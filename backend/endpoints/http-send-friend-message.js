const AWS = require("aws-sdk");
const { list_add } = require("../common/list_add");
const { list_remove } = require("../common/list_remove");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
const Formatting = require("../common/Formatting");
const { updateSingle } = require("../common/update");
const Credentials = require("../common/constants");
const client = require("twilio")(Credentials.accountSid, Credentials.authToken);
var documentClient = new AWS.DynamoDB.DocumentClient();

const callMe = async (user, messageToSend, sender) => {
  await client.calls.create({
    twiml: `<Response><Say>${sender} says hi ${user.username}, ${messageToSend}</Say></Response>`,
    to: user.phone_number,
    from: "+12264076113",
  });
};
const textMe = async (user, messageToSend, sender) => {
  await client.messages.create({
    body: `Hi ${user.username}, ${messageToSend} - From ${sender}`,
    from: "+12264076113",
    to: user.phone_number,
  });
};

exports.handler = async (event) => {
  const eventBody = Formatting.ensureObject(event.body);
  const yourSub = Formatting.getSub(event);
  const { sub, message } = eventBody;
  const paramsYou = {
    Key: { sub: yourSub },
    TableName: Tables.USERS,
  };
  let you = (await documentClient.get(paramsYou).promise()).Item;
  const params = {
    Key: { sub: sub },
    TableName: Tables.USERS,
  };
  let resp = (await documentClient.get(params).promise()).Item;
  if (resp.call) {
    await callMe(resp, message, you.username);
  } else {
    await textMe(resp, message, you.username);
  }
  return Responses._200({ message: "Message Sent Successfully" });
};
