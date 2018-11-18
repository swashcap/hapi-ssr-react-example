import React from "react";
import ReactDOM from "react-dom";

import App from "../components/App";

const el = document.querySelector(".app");
let initialProps;

if (
  (window as any)["__INITIAL_PROPS__"] &&
  typeof (window as any)["__INITIAL_PROPS__"] === "object"
) {
  initialProps = (window as any)["__INITIAL_PROPS__"];
} else {
  initialProps = {};
}

if (el) {
  ReactDOM.hydrate(<App {...initialProps} />, el);
}
