import * as React from "react";
import ImageLoader from "react-imageloader";
import CircularProgress from "material-ui/CircularProgress";
import Divider from "material-ui/Divider";
import {
    Card,
    CardActions,
    CardMedia,
    CardTitle,
    CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

import * as csstips from "csstips";
import {style, media} from "typestyle";

import colors from "styles/colors";
import dimens from "styles/dimens";

const ReactGA = require("react-ga");

const cardStyle = {
    wrapper: style(
        csstips.selfStart,
        media({
            maxWidth: dimens.media.small
        },    {width: "100%"}),
        media({
            minWidth: dimens.media.small
        },    {width: "auto"}),
        {border: `${dimens.spacing.small}px solid transparent`}
    ),
    root: style(
        media({
            maxWidth: dimens.media.small
        },    {width: "100%"}),
        media({
            minWidth: dimens.media.small
        },    {width: dimens.media.small})
    ),
    header: style(
        csstips.horizontal,
        csstips.center, {
            lineHeight: dimens.font.smaller
        }
    ),
    media: style({
        $nest: {
            "img": {
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto"
            }
        }
    }),
    mainTitle: {
        fontSize: dimens.font.small,
        lineHeight: "inherit"
    },
    title: {
        fontSize: dimens.font.smaller
    },
    subTitle: {
        fontSize: dimens.font.smallest
    },
    description: style(
        media({
            maxWidth: dimens.media.small
        },    {lineHeight: dimens.font.medium}),
        media({
            minWidth: dimens.media.small
        },    {lineHeight: dimens.font.medium})
    ),
    loader: Object.assign(csstips.selfCenter, {
        marginLeft: "auto",
        marginRight: "auto"
    }),
    loaderWrapper: {
        display: "flex",
        width: "100%",
        height: dimens.preloader.height
    },
    actionsWrapper: {
        padding: `${dimens.spacing.smallest / 3}rem`
    },
    actions: style({
        $nest: {
            "span": {
                color: colors.accentColor
            }
        }
    }),
    actionLabel: {
        fontSize: dimens.font.smallest
    }
};

export interface ListItemProps {
    title: string;
    date: string;
    baseImageUrl: string;
    coverIndex: number;
    itemClass: string;
    description: string;
    keywords: string;
}

const preloader = () => {
    return <CircularProgress
        innerStyle={cardStyle.loader}
        style={cardStyle.loaderWrapper}/>;
};

class ListItem extends React.Component <ListItemProps, undefined> {

    render() {
        let { renderImage, renderTitle, renderSubTitle, renderDescription, renderActions, onCardExpanded } = this;
        return (
            <div className={cardStyle.wrapper}>
                <Card className={cardStyle.root} onExpandChange={onCardExpanded.bind(this, this.props.itemClass)}>
                    {renderImage()}
                    {renderTitle()}
                    {renderSubTitle()}
                    {renderDescription()}
                    <Divider/>
                    {renderActions()}
                </Card>
            </div>
        );
    }

    renderImage = () => {
        return  <CardMedia>
                    <ImageLoader
                        src={`${this.props.baseImageUrl}${this.props.itemClass}${this.props.coverIndex}.png`}
                        wrapper={React.DOM.div}
                        preloader={preloader}
                        className={cardStyle.media}>
                    </ImageLoader>
                </CardMedia>;
    }

    renderTitle = () => {
        return  <CardTitle
                    title={this.props.title}
                    titleStyle={cardStyle.mainTitle}
                    style={{ paddingBottom: 0 }}/>;
    }

    renderSubTitle = () => {
        return  <CardTitle
                    title={this.props.date}
                    subtitle={this.props.keywords}
                    style={{ paddingTop: 0 }}
                    titleStyle={cardStyle.title}
                    subtitleStyle={cardStyle.subTitle}/>;
    }

    renderDescription = () => {
        return  <CardText
                    actAsExpander={true}
                    className={cardStyle.description}
                    expandable={true}>
                    {this.props.description}
                </CardText>;
    }

    renderActions = () => {
        return <CardActions actAsExpander={true} style={cardStyle.actionsWrapper} className={cardStyle.actions}>
                    <FlatButton label="View More" labelStyle={cardStyle.actionLabel}/>
                </CardActions>;
    }

    onCardExpanded(name: string, newExpandedState: boolean) {
        if (process.env.NODE_ENV === "production" && newExpandedState) {
            ReactGA.modalview(`/${name}`);
        }
    }
}

export default ListItem;
