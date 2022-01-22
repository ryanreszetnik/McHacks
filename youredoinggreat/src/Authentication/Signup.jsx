import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
export default function Signup() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    console.log(await Auth.signUp(phone, password));
  };
  return (
    <div>
      <TextField value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => submit()}>Create Account</Button>
      <div>{phone}</div>
      <div> {password}</div>
    </div>
  );
}
