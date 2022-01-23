const AWS = require("aws-sdk");
const Tables = require("../common/Tables");
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  // TODO implement
  if (event.triggerSource != "PostConfirmation_ConfirmSignUp") {
    callback(null, event);
  }
  try {
    const params = {
      Item: {
        sub: event.request.userAttributes.sub,
        username: event.request.userAttributes.name,
        phone_number: event.request.userAttributes.phone_number,
        call: true,
        water: false,
        exercise: false,
        food: false,
        lastMessageTime: new Date().toISOString(),
        messagesEnables: false,
        messageInterval: { minutes: 1, hours: 0 },
        messageTimeRange: {
          start: { hour: 9, minute: 0 },
          end: { hour: 2, minute: 30 },
        },
      },
      TableName: Tables.USERS,
    };
    await documentClient.put(params).promise();
  } catch (err) {
    callback(JSON.stringify(err));
  }
  callback(null, event);
};
