import { Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmPhone() {
  const location = useLocation();
  const phone = location.state.phone;
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const submit = async () => {
    try {
      console.log(await Auth.confirmSignUp(phone, code));
      navigate("/");
    } catch (e) {
      alert("Wrong code, please try again");
    }
  };
  const resend = async () => {
    console.log(await Auth.resendSignUp(phone));
  };
  return (
    <div>
      <div>Enter code sent to {phone}</div>
      <TextField value={code} onChange={(e) => setCode(e.target.value)} />
      <Button onClick={() => submit()}>Confirm Phone</Button>
      <Button onClick={() => resend()}>Resend Link</Button>
    </div>
  );
}
