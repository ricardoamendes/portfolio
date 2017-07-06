export function toggleSidebar() {
    return {type: "TOGGLE_SIDEBAR"};
}

export function toggleSearchbar() {
    return {type: "TOGGLE_SEARCHBAR"};
}

export function toggleViewMore() {
    return {type: "TOGGLE_VIEW_MORE"};
}

export function updateSocialIcons(hidden: boolean) {
    return {type: "UPDATE_SOCIAL_ICONS", hidden};
}

export function updateTopbarHeight(height: number) {
    return {type: "UPDATE_TOPBAR_HEIGHT", height};
}

export function updateQuery(query: any) {
    return {type: "UPDATE_SEARCH_QUERY", query};
}
