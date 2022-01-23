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
    
    <div style={{margin:"0 auto", width:"500px"}}>
      <div className="overall">
      <TextField
       variant="filled"
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      
      <TextField
       variant="filled"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton onClick={()=>submit()} label="Sign In"/>
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
    </div>
  );
}
