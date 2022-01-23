import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { useState } from "react";
import "./preferences.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MESSAGE, REMOVE_MESSAGE } from "../Constants/reducerEvents";

export default function Preferences() {
  const [call, setCall] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const handleChange = () => {
    setCall((c) => !c);
  };
  const submitMessage = () => {
    setMessage("");
    dispatch({ type: ADD_MESSAGE, payload: message });
  };
  const deleteAMessage = (message) => {
    dispatch({ type: REMOVE_MESSAGE, payload: message });
  };
  return (
    <div>
      <div>What are some phrases that would help motivate you</div>
      <div>eg. Think about your goals, you got this!</div>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Enter a message"
      />
      <Button onClick={submitMessage}>Submit</Button>
      <div>Your current messages</div>

      {messages.map((m) => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ margin: "auto 0" }}>{m}</div>
            <IconButton onClick={() => deleteAMessage(m)}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        );
      })}
      <div>What specific tasks would you like reminders about?</div>
      <FormGroup>
        <div style={{ display: "flex" }}>
          <FormControlLabel
            control={<Checkbox checked={call} onChange={() => setCall(true)} />}
            label="Call"
          />
          <FormControlLabel
            control={
              <Checkbox checked={!call} onChange={() => setCall(false)} />
            }
            label="Text"
          />
        </div>
      </FormGroup>
      <div>How would you prefer </div>
    </div>
  );
}
