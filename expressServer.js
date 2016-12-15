/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */
/* eslint-disable max-params */
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('dev'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      // console.error(err.stack);

      // return res.sendStatus(500);

      return next(err);
    }

    const pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

app.post('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      // console.error(readErr.stack);

      // return res.sendStatus(500);

      return next(readErr);
    }

    const pets = JSON.parse(petsJSON);
    const name = req.body.name;
    const kind = req.body.kind;
    const age = Number.parseInt(req.body.age);

    if (!name || !kind || Number.isNaN(age)) {
      // return res.sendStatus(400);

      return next();
    }

    const pet = { name, age, kind };

    pets.push(pet);

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        // console.error(writeErr.stack);

        // return res.sendStatus(500);

        return next(writeErr);
      }

      res.send(pet);
    });
  });
});

app.get('/pets/:index', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      // console.error(err.stack);

      // return res.sendStatus(500);

      return next(err);
    }

    const index = Number.parseInt(req.params.index);
    const pets = JSON.parse(petsJSON);

    if (index < 0 || index >= pets.length || Number.isNaN(index)) {
      // return res.sendStatus(404);
      return next();
    }

    res.send(pets[index]);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  return res.sendStatus(500);
});

app.get('*', (req, res, next) => {
  res.sendStatus(404);
});

app.post('*', (req, res, next) => {
  res.sendStatus(400);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
