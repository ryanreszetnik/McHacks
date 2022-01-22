export const awsConfig = {
  Auth: {
    region: "ca-central-1",
    userPoolId: process.env.REACT_APP_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,
  },
  endpoints: [
    {
      name: "GeneralEndpoint",
      endpoint:
        "https://66tm70ugr4.execute-api.ca-central-1.amazonaws.com/dev/",
    },
  ],
};
