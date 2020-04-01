const { defaultDbAddress, defaultIp, defaultPort, frontEndAddress } = require("./config");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Participant = require('./models/participant');

mongoose.connect(defaultDbAddress, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', () => {
   console.log('db connected');
});

app.use(cors({
   origin: frontEndAddress,
   credentials: true
}));
app.use(bodyParser.json());

app.listen(defaultPort, defaultIp, () => {
   console.log(`Server is listening at ${defaultIp}:${defaultPort}`);
});

app.post('/sign-event', (req, res) => {
   const {firstName, lastName, email, date} = req.body;
   const newParticipant = new Participant({
      firstName,
      lastName,
      email,
      date
   });

   const errors = newParticipant.validateSync();
   if (errors) {
      const errorList = [];
      for (let err of Object.values(errors.errors)) {
         errorList.push(err.message);
      }
      res.status(400).json(errorList);
   } else {
      newParticipant.save();
      res.sendStatus(201);
   }
   res.end();
});

app.get('/participants', async (req, res) => {
   const participants = Participant.find();
   const test = await participants.exec();
   res.json(test);
});