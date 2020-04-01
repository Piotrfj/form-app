import React from 'react';
import Notification from "./Notification";
import * as actions from '../../redux/actions'
import { renderWithRedux } from "../../utils";

describe('Notification test', () => {
    it('renders empty notification', () => {
        const { container } = renderWithRedux(<Notification />);
        expect(container.querySelector('.notification')).not.toBeInTheDocument();
    });
    it('displays notification after redux action', () => {
        const { getByText, store } = renderWithRedux(<Notification />);
        const notificationContent = 'test notification';
        store.dispatch(actions.showNotification([notificationContent]));
        expect(getByText(notificationContent)).toBeInTheDocument();
    });
});



