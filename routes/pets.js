/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */
/* eslint-disable max-params */
/* eslint-disable new-cap */
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, '../pets.json');

const express = require('express');
const router = express.Router();

// Read all
router.get('/pets', (_req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }

    const pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

// Read one
router.get('/pets/:index', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }

    const pets = JSON.parse(petsJSON);
    const index = Number.parseInt(req.params.index);

    if (index < 0 || index >= pets.length || Number.isNaN(index)) {
      return next();
    }

    res.send(pets[index]);
  });
});

// Create
router.post('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const pets = JSON.parse(petsJSON);
    const { kind, name } = req.body;
    const age = Number.parseInt(req.body.age);

    if (!kind || !name || Number.isNaN(age)) {
      return res.sendStatus(400);
    }

    const pet = { name, age, kind };

    pets.push(pet);

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }

      res.send(pet);
    });
  });
});

// Update
router.patch('/pets/:index', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const pets = JSON.parse(petsJSON);
    const index = Number.parseInt(req.params.index);

    if (index < 0 || index >= pets.length || Number.isNaN(index)) {
      return next();
    }

    const { kind, name } = req.body;
    const age = Number.parseInt(req.body.age);

    if (!age && !name && !kind) {
      return res.sendStatus(400);
    }

    if (name) {
      pets[index].name = name;
    }

    if (kind) {
      pets[index].kind = kind;
    }

    if (age) {
      if (Number.isNaN(age)) {
        return res.sendStatus(400);
      }

      pets[index].age = age;
    }

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }

      res.send(pets[index]);
    });
  });
});

// Delete
router.delete('/pets/:index', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }

    const pets = JSON.parse(petsJSON);
    const index = Number.parseInt(req.params.index);

    if (index < 0 || index >= pets.length || Number.isNaN(index)) {
      return next();
    }

    const pet = pets.splice(index, 1)[0];
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }

      res.send(pet);
    });
  });
});

module.exports = router;
