import React from 'react';
import "./Header/header.css";

export default function CustomButton({onClick,label}) {
  return <button className="signOutButton" onClick={onClick}>{label}</button>;
}
