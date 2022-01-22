import { Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";

export default function ConfirmPhone() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const submit = async () => {
    console.log(await Auth.confirmSignUp(phone, code));
  };
  return (
    <div>
      <TextField value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextField value={code} onChange={(e) => setCode(e.target.value)} />
      <Button onClick={() => submit()}>Confirm Phone</Button>
      <div>{phone}</div>
      <div> {code}</div>
    </div>
  );
}
