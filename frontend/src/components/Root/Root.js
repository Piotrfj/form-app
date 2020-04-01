import React from 'react';
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Form from "../Form/Form";
import Notification from "../Notification/Notification";

const Root = () => (
    <Provider store={store}>
        <Form/>
        <Notification/>
    </Provider>
);

export default Root;
