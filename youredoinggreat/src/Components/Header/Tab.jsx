import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Tab({ name, link, selected }) {
  const navigate = useNavigate();
  return (
    <div className="tab" onClick={() => navigate(link)}>
      <p className={"tabLabel" + (selected ? " selected" : "")}>{name}</p>
    </div>
  );
}
