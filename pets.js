/* eslint-disable no-console */
#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  const index = parseInt(process.argv[3]);

  if (index >= 0) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const pets = JSON.parse(data);

      if (!pets[index]) {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
        process.exit(1);
      }

      console.log(pets[index]);
    });
  }
  else {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const pets = JSON.parse(data);

      console.log(pets);
    });
  }
}
else if (cmd === 'create') {
  const age = parseInt(process.argv[3]);
  const kind = process.argv[4];
  const name = process.argv[5];

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);

    if (!age || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
    const pet = {};

    pet.age = age;
    pet.kind = kind;
    pet.name = name;

    pets.push(pet);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}
else if (cmd === 'update') {
  const index = process.argv[3];
  const age = parseInt(process.argv[4]);
  const kind = process.argv[5];
  const name = process.argv[6];

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);

    if (!index || !age || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    const pet = {};

    pet.age = age;
    pet.kind = kind;
    pet.name = name;

    pets.splice(index, 1, pet);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}
else if (cmd === 'destroy') {
  const index = parseInt(process.argv[3]);

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);

    if (!index) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    pets.splice(index, 1);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pets[index]);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
