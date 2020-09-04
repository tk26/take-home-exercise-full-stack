const express = require('express');
const bodyParser = require('body-parser');
const { ValidationError } = require('sequelize');

const { TeamMember } = require('./model');

const app = express();

app.use(bodyParser.json());

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

app.post('/team', async (req, res, next) => {
  try {
    const member = await TeamMember.create(req.body);
    console.log(`Member created successfully: ${JSON.stringify(member)}`);
    return res.sendStatus(201);
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    if (error instanceof ValidationError) {
      return res.status(400).send(error.errors[0].message);
    }
    return res.sendStatus(500);
  }
});

module.exports = app;
