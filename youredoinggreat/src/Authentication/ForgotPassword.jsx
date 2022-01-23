import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { SET_USER } from "../Constants/reducerEvents";
import { useNavigate } from "react-router-dom";
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
    <div>
      <TextField value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Button onClick={() => submit()}>Submit Number</Button>
      <div>
        <Link
          style={{ cursor: "pointer" }}
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
