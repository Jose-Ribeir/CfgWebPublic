// var express = require('express');
// var router = express.Router();
//
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   let users=[{name:"John Doe",birthDate:"19/02/1999"}];
//   res.send(users);
// });
//
// module.exports = router;

const client = require('../models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();

const client = require("../models/connection");
const getGames = (request, response) => {
    client.query('SELECT * FROM software where software_is_game=true', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })

}

const getApps = (request, response) => {
    client.query('SELECT * FROM software where software_is_game=false', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}