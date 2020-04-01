import React from 'react';
import { renderWithRedux } from "../../utils";
import Form from "./Form";
import { fireEvent } from "@testing-library/react";
import axios from 'axios';

jest.mock('axios');
afterEach(() => jest.resetAllMocks());

describe('Form tests', () => {
  it('renders all inputs properly', () => {
    const {getByLabelText} = renderWithRedux(<Form/>);
    expect(getByLabelText(/first name/i)).toBeInTheDocument();
    expect(getByLabelText(/last name/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/date/i)).toBeInTheDocument();
  });
  it('inputs correctly react to onChange event', () => {
    const {getByLabelText} = renderWithRedux(<Form/>);
    const input = getByLabelText(/first name/i);
    const eventValue = 'abc';

    fireEvent.change(input, {target: {value: eventValue}});

    expect(getByLabelText(/first name/i)).toHaveValue(eventValue);
  });
  it('fires notification error when not every field is filled', () => {
    const {getByTestId, store} = renderWithRedux(<Form/>);
    const form = getByTestId(/form/i);

    expect(store.getState().isNotificationVisible).toBe(false);
    expect(store.getState().notificationList).toHaveLength(0);

    fireEvent.submit(form);

    expect(store.getState().notificationList).not.toHaveLength(0);
    expect(store.getState().isNotificationVisible).toBe(true);
  });
  it('properly clears inputs after successful response', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve());
    const { getByLabelText, getByTestId } = renderWithRedux(<Form/>);
    const inputFirstName = getByLabelText(/first name/i);
    const inputLastName = getByLabelText(/last name/i);
    const inputEmail = getByLabelText(/email/i);
    const form = getByTestId(/form/i);

    fireEvent.change(inputFirstName, {target: {value: 'Joe'}});
    fireEvent.change(inputLastName, {target: {value: 'Moris'}});
    fireEvent.change(inputEmail, {target: {value: 'joe.moris@gmail.com'}});
    fireEvent.submit(form);
    await
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(inputFirstName).toHaveValue('');
    expect(inputLastName).toHaveValue('');
    expect(inputEmail).toHaveValue('');
  })
});