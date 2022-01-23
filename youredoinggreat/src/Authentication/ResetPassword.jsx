import { Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const phone = location.state.phone;
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = async () => {
    try {
      console.log(await Auth.forgotPasswordSubmit(phone, code, password));
      navigate("/");
    } catch (e) {
      alert("Wrong code, please try again");
    }
  };
  const resend = async () => {
    console.log(await Auth.forgotPassword(phone));
  };
  return (
    <div>
      <div>Enter code sent to {phone}</div>
      <TextField
        label="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <TextField
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => submit()}>Change Password</Button>
      <Button onClick={() => resend()}>Resend Link</Button>
    </div>
  );
}
