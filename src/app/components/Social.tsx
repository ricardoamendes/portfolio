import * as React from "react";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";
import * as csstips from "csstips";
import {style, classes} from "typestyle";

import * as UIActionsCreator from "actions/ui";

import colors from "styles/colors";
import dimens from "styles/dimens";

import List from "./List";

const socialStyle = {
    root: style(csstips.centerCenter, {
        position: "fixed",
        bottom: dimens.spacing.small,
        width: "100%",
        height: dimens.bar.height,
        margin: "0 auto",
        zIndex: 3,
        transition: "all .3s ease-out",
        $nest: {
            "a": {
                width: dimens.bar.height,
                height: dimens.bar.height,
                margin: dimens.spacing.small/2,
                borderRadius: "100%"
            },
            "svg": {
                height: "100%",
                fill: "white"
            }
        }
    }),
    hide: {
        transform: "translate(0, 70px)"
    },
    email: {
        background: colors.cornflowerBlue
    },
    linkedin: {
        background: colors.deepCerulean
    },
    twitter: {
        background: colors.pictonBlue
    },
    plus: {
        background: colors.punch
    }
};

function mapStateToProps({ ui }: any) {
  return {
    socialIconsHidden: ui.socialIconsHidden
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    UIActions: bindActionCreators(UIActionsCreator as any, dispatch)
  };
}

interface SocialProps {
    socialIconsHidden: boolean;
}

class Social extends React.Component <SocialProps, undefined> {

    render() {
        let { socialIconsHidden } = this.props;
        let hideStyle = socialIconsHidden ? socialStyle.hide : {};
        return (
            <div id="social" className={socialStyle.root} style={hideStyle}>
                <a style={socialStyle.email} href="mailto:ricardoamendes@gmail.com" target="_blank"><svg viewBox="0 0 512 512"><path d="M101.3 141.6v228.9h0.3 308.4 0.8V141.6H101.3zM375.7 167.8l-119.7 91.5 -119.6-91.5H375.7zM127.6 194.1l64.1 49.1 -64.1 64.1V194.1zM127.8 344.2l84.9-84.9 43.2 33.1 43-32.9 84.7 84.7L127.8 344.2 127.8 344.2zM384.4 307.8l-64.4-64.4 64.4-49.3V307.8z"/></svg></a>
                <a style={socialStyle.linkedin} href="https://www.linkedin.com/in/ricardoamendes" target="_blank"><svg viewBox="0 0 512 512"><path d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5 -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1 107.9 186.4 123.4 186.4 142.4zM181.4 201.3h-57.8V388.1h57.8V201.3zM273.8 201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98 0 98h57.5c0 0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6 0-56.3 30.9-56.3 30.9v-25.2H273.8z"/></svg></a>
                <a style={socialStyle.twitter} href="https://twitter.com/ricardoaomendes" target="_blank"><svg viewBox="0 0 512 512"><path d="M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z"/></svg></a>
                <a style={socialStyle.plus} href="https://plus.google.com/111900504282712715414" target="_blank"><svg viewBox="0 0 512 512"><path d="M179.7 237.6L179.7 284.2 256.7 284.2C253.6 304.2 233.4 342.9 179.7 342.9 133.4 342.9 95.6 304.4 95.6 257 95.6 209.6 133.4 171.1 179.7 171.1 206.1 171.1 223.7 182.4 233.8 192.1L270.6 156.6C247 134.4 216.4 121 179.7 121 104.7 121 44 181.8 44 257 44 332.2 104.7 393 179.7 393 258 393 310 337.8 310 260.1 310 251.2 309 244.4 307.9 237.6L179.7 237.6 179.7 237.6ZM468 236.7L429.3 236.7 429.3 198 390.7 198 390.7 236.7 352 236.7 352 275.3 390.7 275.3 390.7 314 429.3 314 429.3 275.3 468 275.3"/></svg></a>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Social as any);
