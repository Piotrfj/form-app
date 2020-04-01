const mongoose = require('mongoose');

const validateEmail = email => {
    const regex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
    return regex.test(email);
};

const Participant = new mongoose.Schema({
    firstName: {type:String, trim:true, required: 'First name is required'},
    lastName: {type:String, trim:true, required: 'Last name is required'},
    email: {type:String, trim:true, required: 'Email is required', validate: [validateEmail, 'Invalid email address']},
    date: {type:String, trim:true, required: 'Date is required'},
});

module.exports = mongoose.model('Participant', Participant);