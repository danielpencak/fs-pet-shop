/* eslint-disable no-console */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-statements */
'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pet.json');

const express = require('express');
const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));
