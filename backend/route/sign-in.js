const express = require('express');

const app = express();

const Joi = require('joi');

const mongoose = require('mongoose');

app.use(express.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { admin } = require('./super');

const PortalAdmin = new mongoose.model(
  'PortalAdmin',
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
    },
  })
);

const cilentSchema = Joi.object({
  email: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required().min(8),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postal: Joi.string().required(),
  country: Joi.string().required(),

  phone: Joi.string().required(),
  role: Joi.string(),
});

app.post('/register-admin', async (req, res) => {
  let found = false;
  const admincheck = await PortalAdmin.find();
  admincheck.forEach((ad) => {
    if (ad.email === req.body.email) {
      found = true;

      return;
    }
  });
  const salt = await bcrypt.genSalt(5);
  let password = req.body.password;
  password = await bcrypt.hash(password, salt);
  if (found)
    return res.status(500).send('username taken');
  const admin = new PortalAdmin({
    email: req.body.email,
    password: password,
    role: 'admin',
  });

  const result = await admin.save();
  res
    .status(200)
    .send('User Created Sucessfully ');
});

app.post('/get-user', async (req, res) => {
  const admin = await PortalUsers.findOne({
    _id: req.body.id,
  });
  if (!admin) {
    return res.status(400).send('no user found');
  }

  res.send(admin);
});

app.post('/get-clients', async (req, res) => {
  const clients = await PortalUsers.find();
  if (!admin) {
    return res.status(400).send('no user found');
  }

  res.send(clients);
});

module.exports = app;
