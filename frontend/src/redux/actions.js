
export const showNotification = (()=>{
    let currentTimeout;
    return(notificationContent) => dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: notificationContent
        });
        clearTimeout(currentTimeout);
        currentTimeout = setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    };
})();

export const hideNotification = () => ({
    type: 'HIDE_NOTIFICATION'
});