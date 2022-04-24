const client = require('../../api-cfg/models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();

const client = require("../../api-cfg/models/connection");
const getCfg = (request, response) => {
    client.query('SELECT * FROM cfg', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })

}

const getCfgById = (request, response) => {
    const id = parseInt(request.params.id)

    client.query('SELECT * FROM cfg WHERE cfg_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        } client.query('UPDATE cfg SET cfg_view = cfg_view + 1 WHERE cfg_id = $1',[id], (error, results) =>{
            if(error){
                throw error
            }
            response.status(200).json(results.rows)
        })

        response.status(200).json(results.rows)
    })
}

module.exports = {
    getCfg,
    getCfgById
}