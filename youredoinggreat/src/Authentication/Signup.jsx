import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
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
    <div>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <Button onClick={() => submit()}>Create Account</Button>
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
