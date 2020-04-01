const initialState = {
    isNotificationVisible: false,
    notificationList: []
};

const coreReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                ...state,
                isNotificationVisible: true,
                notificationList: action.payload
            };
        case 'HIDE_NOTIFICATION':
            return {
                ...state,
                isNotificationVisible: false,
                notificationList: []
            };
        default:
            return state;
    }
};

export default coreReducer;
