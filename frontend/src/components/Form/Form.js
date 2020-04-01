import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import '../Form/Form.scss';
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, validateEmail } from "../../utils";
import { showNotification } from "../../redux/actions";
import axios from "axios";
import { rootAPI } from "../../config";

class Form extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        date: new Date(),
    };

    handleSubmit = e => {
        e.preventDefault();
        if (!this.validateForm()) {
            return;
        }
        const {firstName, lastName, email, date} = this.state;
        axios.post(`${rootAPI}/sign-event`, {
            firstName,
            lastName,
            email,
            date: formatDate(date)
        }).then(() => {
            this.resetForm();
        }).catch(err => {
            this.props.showNotification(err.response.data);
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleDateChange = date => {
        this.setState({date})
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form" data-testid="form">
                <label htmlFor="firstName">First name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First name"
                    value={this.state.firstName}
                    onChange={this.handleChange}/>
                <label htmlFor="lastName">Last name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last name"
                    value={this.state.lastName}
                    onChange={this.handleChange}/>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}/>
                <label htmlFor="date">Date</label>
                <DatePicker
                    id="date"
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    dateFormat='dd-MM-yyyy'/>
                <button>Submit</button>
            </form>
        );
    }

    resetForm = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            date: new Date(),
        })
    };

    validateForm = () => {
        const validationErrors = [];
        const {firstName, lastName, email, date} = this.state;
        if (firstName.trim().length === 0) {
            validationErrors.push('First name is required');
        }
        if (lastName.trim().length === 0) {
            validationErrors.push('Last name is required');
        }
        if (email.trim().length === 0) {
            validationErrors.push('Date is required');
        } else if (!validateEmail(email)) {
            validationErrors.push('Invalid email address');
        }
        if (!date) {
            validationErrors.push('Date is required')
        }

        if (validationErrors.length > 0) {
            this.props.showNotification(validationErrors);
            return false;
        } else {
            return true;
        }
    };

}

export default connect(null, {showNotification})(Form);