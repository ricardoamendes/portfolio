const initialState = {
    sidebarOpen: false,
    searchbarOpen: false,
    socialIconsHidden: false,
    topBarHeight: 0,
    searchQuery: ""
};

function data(state = initialState, action : any) {
    switch (action.type) {

        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                searchbarOpen: false,
                sidebarOpen: !state.sidebarOpen
            };

        case "TOGGLE_SEARCHBAR":
            return {
                ...state,
                sidebarOpen: false,
                searchbarOpen: !state.searchbarOpen
            };

        case "UPDATE_SEARCH_QUERY":
            return {
                ...state,
                searchQuery: action.query
            };

        case "UPDATE_SOCIAL_ICONS":
            return {
                ...state,
                socialIconsHidden: action.hidden
            };

        case "UPDATE_TOPBAR_HEIGHT":
            return {
                ...state,
                topBarHeight: action.height
            };

        default:
            return state;

    }

}

export default data;
