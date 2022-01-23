import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sendMessageToFriend } from "../../Endpoints";
import CustomButton from "../CustomButton";
import "./otherUsers.css";
export default function OtherUsers() {
  const [member, setMember] = React.useState("");
  const [message, setMessage] = useState("");
  const otherUsers = useSelector((state) => state.otherUsers);

  const handleChange = (event) => {
    setMember(event.target.value);
  };
  const submit = () => {
    if (member !== "" && message.length > 0) {
      console.log("send to", member);
      sendMessageToFriend(member, message);
      setMember("");
      setMessage("");
    } else {
      console.log("nope");
    }
  };

  return (
    <div style={{ width: "600px"}}>
      <div className="title">Send A Supportive Message To A Friend </div>
      <div style={{ width: "500px"}}>
      <Box sx={{ minWidth: "200px", paddingLeft: "210px", paddingTop: "10px"}}>
        
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Member</InputLabel>
          <Select
            variant="filled"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={member}
            label="Age"
            onChange={handleChange}
            minWidth="300px"
          >
            {otherUsers.map((user) => (
              <MenuItem value={user.sub}>{user.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <TextField fullWidth
          variant="filled"
          label="Message To Send"
          
          multiline
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div>
        <CustomButton label="Send" onClick={() => submit()} />
        </div>
      </Box>
      </div>
    </div>
  );
}
