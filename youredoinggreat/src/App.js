import logo from "./logo.svg";
import "./App.css";
import Signup from "./Authentication/Signup";
import Amplify from "aws-amplify";
import { awsConfig } from "./credentials";
import ConfirmPhone from "./Authentication/ConfirmPhone";
import Signin from "./Authentication/Signin";

Amplify.configure(awsConfig);

function App() {
  return (
    <div className="App">
      <Signup />
      <ConfirmPhone />
      <Signin />
    </div>
  );
}

export default App;
