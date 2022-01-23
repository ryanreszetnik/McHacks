import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import React from "react";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../Constants/reducerEvents";
import Tab from "./Tab";
import "./header.css";
import { useLocation } from "react-router-dom";
import logo from "../../images/output-onlinepngtools.png";
import CustomButton from "../CustomButton";

const pages = [
  { name: "Home", link: "/" },
  { name: "Preferences", link: "/preferences" },
  { name: "Resources", link: "/resources" },
];

export default function Header() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const signOut = async () => {
    await Auth.signOut();
    dispatch({ type: SET_USER, payload: null });
  };
  return (
    <div
      className="headerBox"
      style={{
        width: "100%",
        height: "80px",
        display: "flex",
      }}
    >
      <div className="appTitle">you're doing great</div>
      <img className="logo" src={logo}></img>

      <div
        style={{
          paddingLeft: "100px",
          paddingRight: "80px",
        }}
      >
        {pages.map((p) => (
          <Tab
            name={p.name}
            link={p.link}
            key={p.name}
            selected={pathname === p.link}
          />
        ))}
      </div>
      <div style={{ paddingTop: "30px" }}>
        <CustomButton onClick={signOut} label="Sign Out" />
      </div>
    </div>
  );
}
