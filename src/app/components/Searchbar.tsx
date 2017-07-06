import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {style} from "typestyle";

import colors from "styles/colors";
import dimens from "styles/dimens";

import TextField from "material-ui/TextField";

import * as UIActionsCreator from "actions/ui";

const mapStateToProps = ({ui}: any) => {
    return {searchbarOpen: ui.searchbarOpen};
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        UIActions: bindActionCreators(UIActionsCreator as any, dispatch)
    };
}

const searchbarStyle = {
    root: style({
        position: "absolute",
        bottom: dimens.spacing.smallest,
        left: 0,
        right: 0,
        height: dimens.bar.height - dimens.spacing.smallest,
        padding: `0 ${dimens.spacing.small}px`,
        transition: "all .3s ease-out",
        background: "white",
        zIndex: 1,
        boxShadow: "0 1px 3px 0 rgba(0,0,0,.3)"
    }),
    expanded: {
        transform: "translate(0, 50px)"
    },
    textField: {
        width: "100%",
        fontSize: dimens.font.smaller
    }
};

interface UIActions {
    updateQuery: (query: any) => void;
}

interface TopbarProps {
    searchbarOpen: boolean;
    UIActions: UIActions;
}

class Searchbar extends React.Component<TopbarProps, undefined> {

    render() {
        let {updateSearchQuery} = this;
        let {searchbarOpen} = this.props;
        let style = searchbarOpen ? searchbarStyle.expanded : {};
        return (
            <div
                className={searchbarStyle.root}
                style={style}>
                <TextField
                    hintText="Filter projects..."
                    underlineShow={false}
                    style={searchbarStyle.textField}
                    onChange={updateSearchQuery.bind(this)}
                />
            </div>
        );
    }

    updateSearchQuery(e: any) {
        this
            .props
            .UIActions
            .updateQuery(e.target.value);
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
