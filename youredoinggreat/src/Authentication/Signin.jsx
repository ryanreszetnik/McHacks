import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { SET_USER } from "../Constants/reducerEvents";
export default function Signin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submit = async () => {
    try {
      console.log(await Auth.signIn(phone, password));
      const usersession = await Auth.currentSession();
      // const user = await Auth.currentUserInfo();
      dispatch({ type: SET_USER, payload: usersession });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <TextField value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => submit()}>Sign In</Button>
      <div>{phone}</div>
      <div> {password}</div>
    </div>
  );
}
