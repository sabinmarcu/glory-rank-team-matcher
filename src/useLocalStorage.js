import { useState, useEffect } from "react";

export default key => {
  const initValue = localStorage.getItem(key) === "true";
  const [state, setState] = useState(initValue);
  useEffect(() => localStorage.setItem(key, state), [state, key]);
  const toggle = () =>
    console.log("Setting state from", state, "to", !state) || setState(!state);
  return [state, toggle];
};
