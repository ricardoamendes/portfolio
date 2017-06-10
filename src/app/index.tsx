import "core-js/shim";
import * as React from "react";
import * as ReactDOM from "react-dom";

import injectTapEventPlugin from "react-tap-event-plugin";
import {setupPage, normalize} from "csstips";

import App from "./components/App";

setupPage("#app");
normalize();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <App/>
, document.getElementById("app"));
