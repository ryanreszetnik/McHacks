import { Auth } from "aws-amplify";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { SET_USER } from "../Constants/reducerEvents";
import ConfirmPhone from "./ConfirmPhone";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Signin from "./Signin";
import Signup from "./Signup";
import "./signin.css"
import logo from "../../src/images/output-onlinepngtools.png"

export default function Authentication({ ...props }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setAuthenticated(true);
      console.log("navigate");
      navigate("/");
    } else {
      setAuthenticated(false);
    }
  }, [user]);
  const login = async () => {
    const usersession = await Auth.currentSession();
    dispatch({ type: SET_USER, payload: usersession });
  };

  useEffect(() => {
    login();
  }, []);

  const authPages = () => {
    return (
        <div style={{width:"100%"}}>
           <div style={{margin:"0 auto",display:"flex",paddingTop:"200px",width:"fit-content"}}>
      <div className="appTitleLogin">you're doing great</div>
      <img className="logoLogin" src={logo}></img>
      </div>
      <Routes>
     
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/confirmSignUp" element={<ConfirmPhone />} />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="/*" element={<Navigate to="/signin" />} />
       
      </Routes>
      </div>
    );
  };

  return (
    <Fragment>
      {!isAuthenticated && authPages()}
      {isAuthenticated && props.children}
    </Fragment>
  );
}
