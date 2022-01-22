const AWS = require("aws-sdk");
const Responses = require("../common/Responses");
const Tables = require("../common/Tables");
const Credentials = require("../common/constants");
const client = require('twilio')(Credentials.accountSid, Credentials.authToken);
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const sub = event.requestContext.authorizer.claims.sub;
  const params = {
    Key: { sub: sub },
    TableName: Tables.USERS,
  };
  const resp = (await documentClient.get(params).promise()).Item;
  
    await client.calls
        .create({
            twiml: '<Response><Say>Hi Ryan!</Say></Response>',
            to: resp.phone_number,
            from: '+12264076113'
        })
        //.then(call => console.log(call.sid));

  return Responses._200(resp);
  
};
