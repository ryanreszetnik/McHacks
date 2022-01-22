import logo from "./logo.svg";
import "./App.css";
import Signup from "./Authentication/Signup";
import Amplify from "aws-amplify";
import { awsConfig } from "./credentials";
import ConfirmPhone from "./Authentication/ConfirmPhone";
import Signin from "./Authentication/Signin";
import { Button } from "@mui/material";
import { appLoad } from "./Endpoints";

Amplify.configure(awsConfig);

function App() {
  const send = async () => {
    console.log(await appLoad());
  };
  return (
    <div className="App">
      <Signup />
      <ConfirmPhone />
      <Signin />
      <Button onClick={send}>Send</Button>
    </div>
  );
}

export default App;
