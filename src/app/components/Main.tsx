import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as csstips from "csstips";
import {style} from "typestyle";

import dimens from "styles/dimens";

import List from "./List";

const mainStyle = {
    root: style(csstips.centerCenter, {
        position: "absolute",
        top: dimens.topbar.height,
        width: "100%"
    })
};

class Main extends React.Component <undefined, undefined> {
    render() {
        return (
            <div className={mainStyle.root}>
                <List/>
            </div>
        );
    }
}

export default Main;
