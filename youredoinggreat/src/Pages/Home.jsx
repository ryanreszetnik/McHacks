import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TimePicker from "@mui/lab/TimePicker";
import React, { useEffect, useState } from "react";
import { callMe, textMe } from "../Endpoints";
import moment from "moment";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { SET_TIME, UPDATE_TIME } from "../Constants/reducerEvents";

export default function Home() {
  const enableMessages = useSelector((state) => state.time.enabled);
  const time = useSelector((state) => state.time.delay);
  const timeOfDay = useSelector((state) => state.time);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const dispatch = useDispatch();
  const submitTime = () => {
    if (startTime === "" || endTime === "") return;
    if (
      minutes < 0 ||
      hours < 0 ||
      (minutes === 0 && hours === 0) ||
      minutes === "" ||
      hours === "" ||
      minutes > 60
    )
      return;

    const timeRange = {
      enabled: enableMessages,
      delay: { hours, minutes },
      start: { hours: startTime.getHours(), minutes: startTime.getMinutes() },
      end: { hours: endTime.getHours(), minutes: endTime.getMinutes() },
    };
    dispatch({ type: UPDATE_TIME, payload: timeRange });
  };

  const call = async () => {
    console.log(await callMe());
  };

  const text = async () => {
    console.log(await textMe());
  };
  const toggleEnabled = () => {
    const timeRange = {
      ...timeOfDay,
      enabled: !enableMessages,
    };
    dispatch({ type: UPDATE_TIME, payload: timeRange });
  };
  return (
    <div style={{ paddingTop: "10px" }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              checked={enableMessages}
              onChange={() => toggleEnabled()}
            />
          }
          label="Enable Messages"
        />
      </FormGroup>

      {enableMessages && (
        <div style={{ paddingTop: "7px" }}>
          <div>
            <div style={{ paddingBottom: "7px" }}>
              {`Send me notifications every: ${time.hours} hrs ${time.minutes} min between `}
              {moment()
                .set("hour", timeOfDay.start.hours)
                .set("minute", timeOfDay.start.minutes)
                .format("h:mm a")}
              {" - "}
              {moment()
                .set("hour", timeOfDay.end.hours)
                .set("minute", timeOfDay.end.minutes)
                .format("h:mm a")}
            </div>
            <TextField
              label="Hours"
              type="number"
              value={hours}
              error={hours < 0 || hours === "" || hours + minutes < 1}
              onChange={(e) => setHours(e.target.value)}
            ></TextField>
            <TextField
              label="Minutes"
              type="number"
              value={minutes}
              error={
                minutes < 0 ||
                minutes === "" ||
                hours + minutes < 1 ||
                minutes > 60
              }
              onChange={(e) => setMinutes(e.target.value)}
            ></TextField>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button variant="contained" onClick={() => submitTime()}>
              Update Time Range
            </Button>
          </div>
        </div>
      )}
      <Button onClick={text}>Text Me</Button>
      <Button onClick={call}>Call Me</Button>
    </div>
  );
}
