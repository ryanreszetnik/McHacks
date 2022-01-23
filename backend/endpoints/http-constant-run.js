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

const callMe = async (user) => {
  const messages = user.messages
    ? user.messages.values
    : ["please add some messages to your account"];
  const messageToSend = messages[Math.floor(Math.random() * messages.length)];
  await client.calls.create({
    twiml: `<Response><Say>Hi ${user.username}, ${messageToSend}</Say></Response>`,
    to: user.phone_number,
    from: "+12264076113",
  });
};
const textMe = async (user) => {
  const messages = user.messages
    ? user.messages.values
    : ["please add some messages to your account"];
  const messageToSend = messages[Math.floor(Math.random() * messages.length)];
  await client.messages.create({
    body: `Hi ${user.username}, ${messageToSend}`,
    from: "+12264076113",
    to: user.phone_number,
  });
};

const shouldSendMessage = (user, currTime) => {
  if (!user.timeRange || !user.timeRange.enabled) {
    return false;
  }
  if (!user.lastTime) {
    return true;
  }
  const lastTime =
    new Date(user.lastTime).getHours() * 60 +
    new Date(user.lastTime).getMinutes();
  const startTime =
    user.timeRange.start.hours * 60 + user.timeRange.start.minutes;
  const endTime = user.timeRange.end.hours * 60 + user.timeRange.end.minutes;
  console.log(endTime, startTime, currTime, lastTime, user.timeRange.delay);
  if (
    (endTime < startTime && currTime < startTime && currTime > endTime) ||
    (endTime >= startTime && (currTime < startTime || currTime > endTime))
  ) {
    return false;
  }
  return (
    (currTime - lastTime + 1440) % 1440 >
    user.timeRange.delay.hours * 60 + user.timeRange.delay.minutes
  );
};
const sendMessage = async (user, time) => {
  console.log("here" + user.username, user.call, time);
  if (user.call) {
    await callMe(user);
  } else {
    await textMe(user);
  }
  await updateSingle(Tables.USERS, "sub", { sub: user.sub, lastTime: time });
};

exports.handler = async (event) => {
  const params = {
    TableName: Tables.USERS,
  };
  const items = (await documentClient.scan(params).promise()).Items;
  const now = new Date();
  now.setHours(now.getHours() - 5);
  const currHour = now.getHours();
  const currMin = now.getMinutes();
  console.log(items);
  const members = items.filter((i) =>
    shouldSendMessage(i, currHour * 60 + currMin)
  );
  console.log(members);

  await Promise.all(
    members.map(async (m) => {
      try {
        await sendMessage(m, now.toISOString());
      } catch (e) {
        console.log(e);
      }
    })
  );
  return Responses._200({});
};
