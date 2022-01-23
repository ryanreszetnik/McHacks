import { Button, TextField } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomButton";

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
    <div style={{ margin: "0 auto", width: "500px", paddingLeft: "200px" }}>
      <div style={{ fontSize: "15px", paddingBottom: "10px" }}>
        Enter the code sent to {phone}
      </div>
      <div style={{ paddingLeft: "40px" }}>
        <TextField
          variant="filled"
          label="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div style={{ paddingLeft: "40px" }}>
        <CustomButton onClick={() => submit()} label="Submit" />
        <CustomButton onClick={() => resend()} label="Resend Link" />
      </div>
    </div>
  );
}
