const AWS = require("aws-sdk");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
const Formatting = require("../common/Formatting");
const Credentials = require("../common/constants");
const foodReminders = ["Have you eaten today? Maybe it is time for a snack.", "When was the last time you had a meal?", "Our brains can only work at full capacity when they are thouroughly nourished! Snack break?"];
const waterReminders = ["It is always a good time to hydrate!", "Not feeling like regular water? Maybe throw in a slice of lemon as a treat :)", "HYDRATE OR DIE-DRATE!"];
const exerciseReminders = ["Stand up and stretch for a quick 30sec to get the blood flowing!", "Check in with yourself- are you clenching your jaw?", "You are so capable! Why don't you do 10 jumping jacks to keep your system alert!"];


const client = require("twilio")(Credentials.accountSid, Credentials.authToken);
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const sub = Formatting.getSub(event);
  const params = {
    Key: { sub: sub },
    TableName: Tables.USERS,
  };
  const resp = (await documentClient.get(params).promise()).Item;
  let messages = resp.messages
    ? resp.messages.values
    : ["please add some messages to your account"];

  console.log(resp.water, resp.food, resp.exercise);
  if (resp.water){
    messages = [...messages,...waterReminders]
  }
  if (resp.food){
    messages = [...messages,...foodReminders]
  }
  if (resp.exercise){
    messages = [...messages,...exerciseReminders]
  }
  console.log(messages.values);
  const messageToSend = messages[Math.floor(Math.random() * messages.length)];
  await client.messages
    .create({
      body: `Hi ${resp.username}, ${messageToSend}`,
      from: "+12264076113",
      to: resp.phone_number,
    })
    .then((message) => console.log(message.sid));
  //.then(call => console.log(call.sid));\

  return Responses._200(resp);
};
