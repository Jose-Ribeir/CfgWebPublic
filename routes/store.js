const client = require('../models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();

const getStores=(request, response)=>{
    client.query('SELECT *,st_x(store_location),st_y(store_location) from store', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports={getStores}