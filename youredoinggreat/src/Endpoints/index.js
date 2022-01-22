import axios from "axios";
import API from "@aws-amplify/api";

import { store } from "../Redux/store";

let headers = null;
function updateToken() {
  const state = store.getState();
  try {
    const token = state.user?.idToken.jwtToken;
    headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
  } catch (e) {
    console.log(state);
    console.log("user or token does not exist");
  }
}
store.subscribe(updateToken);

export const appLoad = async () => {
  console.log(headers);
  return await API.get("GeneralEndpoint", "/", { headers });
};

export const callMe = async () => {
  console.log(headers);
  return await API.put("GeneralEndpoint", "/call", { headers,body:{} });
};