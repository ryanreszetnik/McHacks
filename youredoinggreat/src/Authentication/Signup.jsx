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
    <div style={{margin:"0 auto", width:"500px",paddingTop:"20px"}}>
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

      <TextField
           variant="filled"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton onClick={()=>submit()} label="Create Account"/>
      <div>
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
  );
}
