import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as csstips from "csstips";
import { style } from "typestyle";
import * as UIActionsCreator from "../actions/ui";
import ListItem from "./ListItem";
import config from "../config";

const baseUrl = config.assets.baseUrl;
const pathName = config.assets.pathName;

const listStyle = {
    root: style(csstips.centerCenter, csstips.horizontal, csstips.wrap)
};

const mapStateToProps = ({ data, ui } : any) => {
    return { searchQuery: ui.searchQuery, items: data.list };
};

const mapDispatchToProps = (dispatch : any) => {
    return {
        UIActions: bindActionCreators(UIActionsCreator as any, dispatch)
    };
};

export interface ListProps {
    searchQuery : string;
    items : [ any ];
}

class List extends React.Component <ListProps, undefined> {

    render() {
        let { renderList } = this;
        let query = this.props.searchQuery.length ? this.props.searchQuery : "All";
        const list = this.filterList(this.props.items, query);
        return renderList(list);
    }

    renderList(list: any[]) {
        return (
            <div className={listStyle.root}>
                {list && list.map((item,i) => {
                    const name = item.assets[0];
                    const cover = item.assets[2];
                    return <ListItem
                        key={i}
                        title={item.title}
                        date={item.date}
                        baseImageUrl={`${ baseUrl }/${ item.transform }/${ pathName }/`}
                        coverIndex={cover}
                        itemClass={name}
                        description={item.description}
                        keywords={item.keywords}/>;
                })}
            </div>
        );
    }

    filterList(list : any[], searchQuery : string) {
        if (searchQuery === "All") {
            return list;
        } else {
            return list.filter(item => {
                const lCategory = item.category.toString().toLowerCase();
                const lDescription = item.description.toLowerCase();
                const lSearchQuery = searchQuery.toLowerCase();
                return lCategory
                    .includes(lSearchQuery) ||
                    lDescription
                    .includes(lSearchQuery);
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List as any);
