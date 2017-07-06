import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as csstips from "csstips";
import {style} from "typestyle";

import CircularProgress from "material-ui/CircularProgress";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import SearchIcon from "material-ui/svg-icons/action/search";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import Snackbar from "material-ui/Snackbar";

import * as UIActionsCreator from "actions/ui";

import colors from "styles/colors";
import dimens from "styles/dimens";

import ImageLoader from "react-imageloader";
import Searchbar from "./Searchbar";

const ReactGA = require("react-ga");
const config = require("config");

function mapStateToProps({ ui, data }: any) {
  return {
    topBarHeight: ui.topBarHeight,
    searchbarOpen: ui.searchbarOpen,
    sidebarOpen: ui.sidebarOpen,
    categories: data.categories
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    UIActions: bindActionCreators(UIActionsCreator as any, dispatch)
  };
}

const topbarStyle = {
    root: style(csstips.horizontal, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: dimens.spacing.small,
        background: colors.primaryColor,
        zIndex: 99,
        height: dimens.topbar.height
    }),
    menuItem: {
        fontSize: dimens.font.smaller
    },
    loader: {
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        height: dimens.preloader.minHeight
    },
    loaderWrapper: Object.assign(
        csstips.selfCenter, {
        marginLeft: "auto",
        marginRight: "auto"
    }),
    placeholder: style({
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.primaryColor,
        zIndex: 1
    }),
    avatar: style(csstips.flex, {
        position: "relative",
        zIndex: 2,
        $nest: {
            "img": {
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                maxHeight: "100%"
            }
        }
    })
};

const preloader = () => {
  return <CircularProgress innerStyle={topbarStyle.loaderWrapper} style={topbarStyle.loader}/>;
};

interface UIActions {
    toggleSidebar: () => void;
    toggleSearchbar: () => void;
    updateQuery: (query: any) => void;
}

interface TopbarProps {
    topBarHeight: number;
    searchbarOpen: boolean;
    sidebarOpen: boolean;
    categories: [any];
    UIActions: UIActions;
}

class Topbar extends React.Component<TopbarProps, undefined> {

    toggleSidebar() {
        this.props.UIActions.toggleSidebar();
        if (process.env.NODE_ENV === "production" && !this.props.sidebarOpen) {
            ReactGA.event({
                category: "Side Bar",
                action: "Expanded"
            });
        }
    }

    toggleSearchbar() {
        this.props.UIActions.toggleSearchbar();
        if (process.env.NODE_ENV === "production" && !this.props.searchbarOpen) {
            ReactGA.event({
                category: "Search Bar",
                action: "Expanded"
            });
        }
    }

    filterData(query: any, e: any) {
        e.preventDefault();
        this.props.UIActions.updateQuery(query);
        this.toggleSidebar();
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        let { topBarHeight, sidebarOpen, categories } = this.props;
        let { toggleSidebar, toggleSearchbar, filterData } = this;
        let avatar = `${config.assets.baseUrl}/${config.assets.pathName}/final.png`;
        topBarHeight = topBarHeight || dimens.topbar.height;
        return (
            <div>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.props.sidebarOpen}
                    onRequestChange={toggleSidebar.bind(this)}>
                        { categories && categories.length > 0 ? categories.map((category, i) => {
                            return (
                                <MenuItem key={ i } style={topbarStyle.menuItem} onTouchTap={filterData.bind(this, category)}>{category}</MenuItem>
                            );
                        })
                        : null }
                </Drawer>
                <div className={topbarStyle.root} style={{height: topBarHeight}}>
                    <Searchbar/>
                    <div className={topbarStyle.placeholder}></div>
                    <IconButton
                        onTouchTap={toggleSidebar.bind(this)}>
                        <MenuIcon
                            color="white"
                        />
                    </IconButton>
                    <ImageLoader
                        src={avatar}
                        wrapper={React.DOM.div}
                        preloader={preloader}
                        className={topbarStyle.avatar}>
                        Image load failed!
                    </ImageLoader>
                    <IconButton
                        onTouchTap={toggleSearchbar.bind(this)}>
                        <SearchIcon
                            color="white"
                        />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
