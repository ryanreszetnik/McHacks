import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import React from "react";
import { useDispatch } from "react-redux";
import { SET_USER } from "../../Constants/reducerEvents";
import Tab from "./Tab";
import "./header.css";
import { useLocation } from "react-router-dom";

const pages = [
  { name: "Home", link: "/" },
  { name: "Preferences", link: "/preferences" },
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
      style={{
        width: "100%",
        backgroundColor: "#333",
        height: "30px",
        display: "flex",
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
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}
