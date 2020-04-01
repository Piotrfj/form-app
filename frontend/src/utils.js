import { applyMiddleware, createStore } from "redux";
import coreReducer from "./redux/reducer";
import thunk from "redux-thunk";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";

export const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

export const validateEmail = email => {
    const regex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
    return regex.test(email);
};

export const renderWithRedux = (
    children,
    {store = createStore(coreReducer, applyMiddleware(thunk))} = {}
) => {
    return {
        ...render(<Provider store={store}>{children}</Provider>),
        store,
    }
};