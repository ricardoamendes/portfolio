import "core-js/shim";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import injectTapEventPlugin from "react-tap-event-plugin";
import {setupPage, normalize} from "csstips";
import data from "./reducers/data";
import ui from "./reducers/ui";
import App from "./components/App";

const reducers = combineReducers({
  data,
  ui
});

let store = createStore(reducers,
  applyMiddleware(thunkMiddleware)
);

setupPage("#app");
normalize();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={ store } >
      <App/>
    </Provider>
, document.getElementById("app"));
