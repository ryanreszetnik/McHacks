import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import CustomButton from "../Components/CustomButton";
export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = async () => {
    try {
      console.log(
        await Auth.signUp({
          username: phone,
          password: password,
          attributes: { name: name },
        })
      );
      navigate("/confirmSignUp", { state: { phone: phone } });
    } catch (e) {
      alert("Account with phone number already exists");
    }
  };
  return (
    <div style={{margin:"0 auto", width:"500px"}}>
      <div style={{paddingLeft: "50px"}}>
      <TextField
      variant="filled"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
           variant="filled"
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div style={{margin:"0 auto", paddingLeft: "50px", width:"300px"}}>
      <TextField
           variant="filled"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <div style={{margin:"0 auto",  paddingLeft: "30px", width:"300px"}}>
  
      <CustomButton onClick={()=>submit()} label="Create Account"/>
      </div>
      </div>
      
      <div style={{fontSize: "12px", paddingTop: "12px", paddingLeft: "70px"}}>
        Already have an account?{" "}
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign in
        </Link>
        {" instead"}
        </div>
      </div>
    </div>
  );
}
