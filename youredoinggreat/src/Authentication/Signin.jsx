import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { SET_USER } from "../Constants/reducerEvents";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async () => {
    try {
      console.log(await Auth.signIn(phone, password));
      const usersession = await Auth.currentSession();
      // const user = await Auth.currentUserInfo();
      console.log(usersession);
      dispatch({ type: SET_USER, payload: usersession });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <TextField
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => submit()}>Sign In</Button>
      <div>
        Dont have an account?{" "}
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create Account
        </Link>
      </div>
      <div>
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/forgotPassword");
          }}
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
