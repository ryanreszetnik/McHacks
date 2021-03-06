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
        lastTime: new Date().toISOString(),
        timeRange: {
          delay: { hours: 0, minutes: 1 },
          start: { hours: 9, minutes: 0 },
          end: { hours: 20, minutes: 0 },
          enabled: false,
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
