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
import { SET_USER } from "./Constants/reducerEvents";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header/Header";
import Preferences from "./Pages/Preferences";

Amplify.configure(awsConfig);

function App() {
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
