import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {cssRule, cssRaw} from "typestyle";
import {MuiThemeProvider} from "material-ui/styles";
import colors from "../styles/colors";
import dimens from "../styles/dimens";
import * as UIActionsCreator from "../actions/ui";
import * as dataActionsCreator from "../actions/data";
import Topbar from "./Topbar";
import Main from "./Main";
import Social from "./Social";

cssRaw(`
    ::-webkit-scrollbar {
    display: none;
    }
`);

cssRule(`@media only screen and (max-width: ${dimens.media.medium}px)`, {
    $nest: {
        html: {
            fontSize: "40%"
        }
    }
});

cssRule(`@media only screen and (min-width: ${dimens.media.medium}px)`, {
    $nest: {
        html: {
            fontSize: "45%"
        }
    }
});

function mapDispatchToProps(dispatch : any) {
    return {
        UIActions: bindActionCreators(UIActionsCreator as any, dispatch),
        dataActions: bindActionCreators(dataActionsCreator as any, dispatch)
    };
}

export interface AppProps {
    UIActions : any;
    dataActions : any;
}

interface AppState {
    show: boolean;
}

class App extends React.Component <AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        let { show } = this.state;
        return (
            <MuiThemeProvider>
                <div style= { show ? { opacity: 1 } : { opacity: 0 } }>
                    <Topbar/>
                    <Main/>
                    <Social/>
                </div>
            </MuiThemeProvider>
        );
    }

    componentWillMount() {
        let {dataActions} = this.props;
        let updateVisibility: boolean;
        let topbarEl : any;
        let topbarHeight : number;
        let topbarNewHeight : number;
        document.onscroll = () => {
            let scrollY = window.scrollY || window.pageYOffset;
            if (scrollY <= dimens.topbar.minHeight) {
                this.props.UIActions.updateSocialIcons(false);
                this.props.UIActions.updateTopbarHeight(dimens.topbar.height - scrollY);
            } else {
                this.props.UIActions.updateSocialIcons(true);
                this.props.UIActions.updateTopbarHeight(dimens.topbar.height - dimens.topbar.minHeight);
            }
        };
        dataActions.fetchList();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: true
            });
        }, 1000);
    }
}

export default connect(null, mapDispatchToProps)(App as any);
