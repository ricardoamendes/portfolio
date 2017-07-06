const req = require("reqwest");

export function fetchList() {
    return (dispatch : any) => {
        let url = window.location.origin + "/data.json";
        if ("caches" in window) {
            caches
                .match(url)
                .then((res: any) => {
                    if (res) {
                        res
                            .json()
                            .then((json: any) => {
                                dispatch({type: "DATA_LIST_UPDATE_ALL", data: json});
                                dispatch({type: "DATA_GROUPING_CATEGORIES"});
                            });
                    }
                });
        }
        req("list.json", (res: any) => {
            dispatch({type: "DATA_LIST_UPDATE_ALL", data: res});
            dispatch({type: "DATA_GROUPING_CATEGORIES"});
        });
    };
}
