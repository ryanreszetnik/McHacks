import { Button } from "@mui/material";
import React from "react";
import { callMe, textMe } from "../Endpoints";

export default function Home() {
  const call = async () => {
    console.log(await callMe());
  };

  const text = async () => {
    console.log(await textMe());
  };
  return (
    <div>
      <Button onClick={text}>Text Me</Button>
      <Button onClick={call}>Call Me</Button>
    </div>
  );
}
