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
const {md5} = require("pg/lib/utils");
const app = express();


client.connect();

const getUsers = (request, response) => {
  client.query('SELECT * FROM person', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM person WHERE person_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getLogin = (request, response) => {
  const users = request.body

  client.query('SELECT * FROM person WHERE person_email = $1 and person_password = $2', [users.person_email.toString() ,md5(users.person_password.toString())], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length < 1)
      response.status(404).send('Wrong email or password '+ " or " +'  Not found')

    response.status(200).json(results.rows[0])

    //response.status(201).send('User found')

  })
}

const createUser = (request, response) => {
  const users = request.body

  client.query('INSERT INTO person (person_name, person_email, person_password) VALUES ($1, $2, $3)', [users.person_name.toString(), users.person_email.toString(), md5(users.person_password.toString())], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  client.query(
      'UPDATE person SET person_name = $1, person_email = $2 WHERE person_id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM person WHERE person_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getLogin
}
