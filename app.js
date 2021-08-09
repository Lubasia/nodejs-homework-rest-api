const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

const { DB_HOST, SENDGRID_API_KEY, PORT = 3000 } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const app = express();

const { contactsRouter, authRouter } = require('./routes/api');
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

app.use('/api/v1/contacts', contactsRouter);
app.use('/api/v1/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database running');
    app.listen(PORT);
  })
  .catch(error => console.log(error));

module.exports = app;
