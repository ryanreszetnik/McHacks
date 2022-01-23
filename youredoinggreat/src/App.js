import logo from "./logo.svg";
import "./App.css";
import Signup from "./Authentication/Signup";
import Amplify, { Auth } from "aws-amplify";
import { awsConfig } from "./credentials";
import ConfirmPhone from "./Authentication/ConfirmPhone";
import Signin from "./Authentication/Signin";
import { Button } from "@mui/material";
import { appLoad, callMe, textMe } from "./Endpoints";
import { useDispatch } from "react-redux";
import { SET_ALL, SET_MESSAGES, SET_USER } from "./Constants/reducerEvents";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header/Header";
import Preferences from "./Pages/Preferences";

Amplify.configure(awsConfig);

function App() {
  const dispatch = useDispatch();
  const load = async () => {
    const data = await appLoad();
    console.log(data);
    dispatch({
      type: SET_ALL,
      payload: {
        exercise: data.exercise,
        food: data.food,
        water: data.water,
        call: data.call,
      },
    });
    const messages = data.messages ? data.messages : [];
    dispatch({ type: SET_MESSAGES, payload: messages });
  };
  useEffect(() => {
    load();
  }, []);
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </Fragment>
  );
}

export default App;
