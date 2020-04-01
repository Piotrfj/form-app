import React from 'react';
import { connect } from 'react-redux';
import './Notification.scss';

const Notification = ({isNotificationVisible, notificationList}) => (
    <>
        {isNotificationVisible &&
        <div className="notification notification--error">
            {notificationList.map(notification => (
                <span key={notification}>{notification}</span>
            ))}
        </div>
        }
    </>
);

const mapStateToProps = ({isNotificationVisible, notificationList}) => ({isNotificationVisible, notificationList});

export default connect(mapStateToProps)(Notification);