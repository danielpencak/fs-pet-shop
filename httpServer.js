/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */
'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

const server = http.createServer((req, res) => {
  const petRegExp = /^\/pets\/(.*)$/;

  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal server error');

        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  }
  else if (req.method === 'GET' && petRegExp.test(req.url)) {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal server error');

        return;
      }
      const matchpetRegExp = (req.url).match(petRegExp);
      const index = Number.parseInt(matchpetRegExp[1]);
      const pets = JSON.parse(petsJSON);

      if (Number.isNaN(index) || index < 0 || index >= pets.length) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');

        return;
      }
      const petJSON = JSON.stringify(pets[index]);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  }

  // else if (req.method === 'GET' && req.url === '/pets/0') {
  //   fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
  //     if (err) {
  //       console.error(err.stack);
  //
  //       res.statusCode = 500;
  //       res.setHeader('Content-Type', 'text/plain');
  //       res.end('Internal server error');
  //
  //       return;
  //     }
  //
  //     const pets = JSON.parse(petsJSON);
  //     const petJSON = JSON.stringify(pets[0]);
  //
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(petJSON);
  //   });
  // }
  // else if (req.method === 'GET' && req.url === '/pets/1') {
  //   fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
  //     if (err) {
  //       console.error(err.stack);
  //
  //       res.statusCode = 500;
  //       res.setHeader('Content-Type', 'text/plain');
  //       res.end('Internal server error');
  //
  //       return;
  //     }
  //
  //     const pets = JSON.parse(petsJSON);
  //     const petJSON = JSON.stringify(pets[1]);
  //
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(petJSON);
  //   });
  // }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const port = process.env.PORT || 9000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
