import logo from "./logo.svg";
import "./App.css";
import Signup from "./Authentication/Signup";
import Amplify, { Auth } from "aws-amplify";
import { awsConfig } from "./credentials";
import ConfirmPhone from "./Authentication/ConfirmPhone";
import Signin from "./Authentication/Signin";
import { Button } from "@mui/material";
import { appLoad, callMe, textMe } from "./Endpoints";
import { useDispatch } from "react-redux";
import { SET_USER } from "./Constants/reducerEvents";
import { useEffect } from "react";

Amplify.configure(awsConfig);

function App() {
  const dispatch = useDispatch();
  const send = async () => {
    console.log(await appLoad());
  };

  const call = async () => {
    console.log(await callMe());
  };

  const text = async () => {
    console.log(await textMe());
  };
  const login = async () => {
    const usersession = await Auth.currentSession();
    dispatch({ type: SET_USER, payload: usersession });
  };
  useEffect(() => {
    login();
  }, []);
  return (
    <div className="App">
      <Signup />
      <ConfirmPhone />
      <Signin />
      <Button onClick={send}>Send</Button>
      <Button onClick={call}>Call Me</Button>
      <Button onClick={text}>Text Me</Button>
    </div>
  );
}

export default App;
