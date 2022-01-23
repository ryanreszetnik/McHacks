import { Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomButton";

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
    <div style={{ margin: "0 auto", width: "400px" }}>
      <div
        style={{ paddingBottom: "10px", fontSize: "14px", paddingTop: "-10px" }}
      >
        Enter the code sent to {phone}
      </div>
      <TextField
        label="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <TextField
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ paddingLeft: "55px" }}>
        <CustomButton onClick={() => submit()} label="Change Password" />
        <CustomButton onClick={() => resend()} label="Resend Link" />
      </div>
    </div>
  );
}
