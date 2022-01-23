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
import { ADD_MESSAGE, REMOVE_MESSAGE, SET_CALL, SET_EXERCISE, SET_WATER, SET_FOOD} from "../Constants/reducerEvents";
import { setCall } from "../Endpoints";

export default function Preferences() {
  const call = useSelector(state => state.preferences.call)
  const food = useSelector(state => state.preferences.food)
  const water = useSelector(state => state.preferences.water)
  const exercise = useSelector(state => state.preferences.exercise)
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
  const toggleCall = () => {
    dispatch({ type: SET_CALL, payload: !call });
  };
  const toggleFood = () => {
    dispatch({ type: SET_FOOD, payload: !food });
  };
  const toggleExercise = (message) => {
    dispatch({ type: SET_EXERCISE, payload: !exercise });
  };
  const toggleWater = (message) => {
    dispatch({ type: SET_WATER, payload: !water });
  };
  return (
    <div className="background">
      <div className="title"> What are some phrases that would help motivate you</div>
      <div className="underline"></div>
      <div className="subtitle">eg. Think about your goals, you got this!</div>
      
      <TextField className="messageBox"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        label="Enter a message"
      />
      <Button onClick={submitMessage}>Submit</Button>
      <div className="currentText">Your current messages</div>

      {messages.map((m) => {
        return (
          <div style={{ display: "flex" }}>
            <div className="messageText" style={{ margin: "auto 0" }}>{m}</div>
            <IconButton onClick={() => deleteAMessage(m)}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        );
      })}
      <div className="title">What specific tasks would you like reminders about?</div>
      <div className="underline"></div>
      <FormGroup>
        <div style={{ display: "flex" }}>
          <FormControlLabel
            control={<Checkbox checked={water} onChange={() => toggleWater()} />}
            label="Water"
          />
          <FormControlLabel
            control={
              <Checkbox checked={food} onChange={() => toggleFood()} />
            }
            label="Food"
          />
           <FormControlLabel
            control={
              <Checkbox checked={exercise} onChange={() => toggleExercise()} />
            }
            label="Exercise"
          />
        </div>
      </FormGroup>
      <div className="title">How would you prefer </div>
      <div className="underline"></div>
      <FormGroup>
        <div style={{ display: "flex" }}>
          <FormControlLabel
            control={<Checkbox checked={call} onChange={() => toggleCall(true)} />}
            label="Call"
          />
          <FormControlLabel
            control={
              <Checkbox checked={!call} onChange={() => toggleCall(false)} />
            }
            label="Text"
          />
        </div>
      </FormGroup>
    </div>
  );
}
