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
import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  SET_CALL,
  SET_EXERCISE,
  SET_WATER,
  SET_FOOD,
} from "../Constants/reducerEvents";
import { callMe, setCall, textMe } from "../Endpoints";
import plant from "../../src/images/plant.png";
import CustomButton from "../Components/CustomButton";

export default function Preferences() {
  const call = useSelector((state) => state.preferences.call);
  const food = useSelector((state) => state.preferences.food);
  const water = useSelector((state) => state.preferences.water);
  const exercise = useSelector((state) => state.preferences.exercise);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);

  const submitMessage = () => {
    setMessage("");
    dispatch({ type: ADD_MESSAGE, payload: message });
  };
  const deleteAMessage = (message) => {
    dispatch({ type: REMOVE_MESSAGE, payload: message });
  };
  const toggleCall = (newVal) => {
    if (newVal !== call) {
      dispatch({ type: SET_CALL, payload: !call });
    }
  };
  const toggleFood = () => {
    dispatch({ type: SET_FOOD, payload: !food });
  };
  const toggleExercise = () => {
    dispatch({ type: SET_EXERCISE, payload: !exercise });
  };
  const toggleWater = () => {
    dispatch({ type: SET_WATER, payload: !water });
  };
  const runTest = async () => {
    if (call) {
      await callMe();
    } else {
      await textMe();
    }
  };
  return (
    <div style={{ backgroundColor: "#DEF9F1", display: "flex" }}>
      <div>
        <div className="title">
          <br></br>
          What are some phrases that would help motivate you?
        </div>
        <div className="subtitle">
          eg. Think about your goals, you got this!
        </div>
        <div
          style={{
            paddingLeft: "139px",
            paddingTop: "10px",
            paddingBottom: "30px",
          }}
        >
          <TextField
            className="messageBox"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Enter a message"
          />
          <Button class="submitButton" onClick={submitMessage}>
            Submit
          </Button>
        </div>

        <div className="currentText">Your current messages</div>

        {messages.map((m) => {
          return (
            <div style={{ display: "flex" }}>
              <div className="messageText" style={{ margin: "auto 0" }}>
                {m}
              </div>
              <IconButton size="small" onClick={() => deleteAMessage(m)}>
                <HighlightOffIcon />
              </IconButton>
            </div>
          );
        })}
        <div className="title">
          What specific tasks would you like reminders about?
        </div>
        <div className="checkboxes">
          <FormGroup>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={water} onChange={() => toggleWater()} />
                }
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
                  <Checkbox
                    checked={exercise}
                    onChange={() => toggleExercise()}
                  />
                }
                label="Exercise"
              />
            </div>
          </FormGroup>
        </div>
        <div className="title">
          How would you prefer to receive your reminders?
        </div>
        <div className="checkboxes">
          <FormGroup>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={call} onChange={() => toggleCall(true)} />
                }
                label="Call"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!call}
                    onChange={() => toggleCall(false)}
                  />
                }
                label="Text"
              />
              <div style={{ marginTop: "-8px" }}>
                <CustomButton label="Test it out" onClick={() => runTest()} />
              </div>
            </div>
          </FormGroup>
        </div>
      </div>
      <div>
        <img className="plant" src={plant}></img>
      </div>
    </div>
  );
}
