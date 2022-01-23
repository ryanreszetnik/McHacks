import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { SET_USER } from "../Constants/reducerEvents";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import CustomButton from "../Components/CustomButton";

export default function Signin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const submit = async () => {
    try {
      console.log(await Auth.signIn(phone, password));
      const usersession = await Auth.currentSession();
      console.log(usersession);
      dispatch({ type: SET_USER, payload: usersession });
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };
  return (
    <div style={{ margin: "0 auto", width: "500px" }}>
      <div className="overall">
        <TextField
          variant="filled"
          label="Phone Number"
          value={phone}
          error={error && error.code === "UserNotFoundException"}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          variant="filled"
          label="Password"
          type="password"
          value={password}
          error={error && error.code === "NotAuthorizedException"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton onClick={() => submit()} label="Sign In" />
        <div style={{ fontSize: "12px" }}>
          <Link
            style={{
              cursor: "pointer",
              paddingRight: "55px",
              fontSize: "12px",
            }}
            onClick={() => {
              navigate("/forgotPassword");
            }}
          >
            Forgot password?
          </Link>
          Don't have an account?{" "}
          <Link
            style={{ cursor: "pointer", fontSize: "12px" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
