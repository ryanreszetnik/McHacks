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
  return await API.put("GeneralEndpoint", "/call", { headers, body: {} });
};

export const textMe = async () => {
  console.log(headers);
  return await API.put("GeneralEndpoint", "/text", { headers, body: {} });
};
export const addMessage = async (message) => {
  console.log("SENDING", message);
  return await API.put("GeneralEndpoint", "/messages", {
    headers,
    body: { message },
  });
};
export const removeMessage = async (message) => {
  return await API.del("GeneralEndpoint", "/messages", {
    headers,
    body: { message },
  });
};
export const setCall = async (check) => {
  return await API.put("GeneralEndpoint", "/call", {
    headers,
    body: {check},
  });
};
export const setFood = async (check) => {
  return await API.put("GeneralEndpoint", "/food", {
    headers,
    body: {check},
  });
};
export const setWater = async (check) => {
  return await API.put("GeneralEndpoint", "/water", {
    headers,
    body: {check},
  });
};
export const setExercise = async (check) => {
  return await API.put("GeneralEndpoint", "/exercise", {
    headers,
    body: {check},
  });
};

