import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { SET_USER } from "../Constants/reducerEvents";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomButton";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async () => {
    try {
      console.log(await Auth.forgotPassword(phone));
      navigate("/resetPassword", { state: { phone: phone } });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{margin:"0 auto", width:"500px", paddingLeft: "200px"}}>
      <TextField variant="filled" label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <CustomButton onClick={() => submit()} label="Submit Number"/>
      
      <div>
        <Link
          style={{ cursor: "pointer", fontSize: "12px", }}
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
