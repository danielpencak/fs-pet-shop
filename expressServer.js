/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }

    const pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack);

      return res.sendStatus(500);
    }

    const pets = JSON.parse(petsJSON);
    const name = req.body.name;
    const kind = req.body.kind;
    const age = Number.parseInt(req.body.age);

    if (!name || !kind || Number.isNaN(age)) {
      return res.sendStatus(400);
    }

    const pet = { name, age, kind };

    pets.push(pet);

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);

        return res.sendStatus(500);
      }

      res.send(pet);
    });
  });
});

app.get('/pets/:index', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }

    const index = Number.parseInt(req.params.index);
    const pets = JSON.parse(petsJSON);

    if (index < 0 || index >= pets.length || Number.isNaN(index)) {
      return res.sendStatus(404);
    }

    res.send(pets[index]);
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
