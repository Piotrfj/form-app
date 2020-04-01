
export const showNotification = (()=>{
    const notificationDuration = 5000;
    let currentTimeout;
    return(notificationContent) => dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: notificationContent
        });
        clearTimeout(currentTimeout);
        currentTimeout = setTimeout(() => {
            dispatch(hideNotification())
        }, notificationDuration)
    };
})();

export const hideNotification = () => ({
    type: 'HIDE_NOTIFICATION'
});