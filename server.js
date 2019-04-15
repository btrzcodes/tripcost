const express = require('express')
const mongo = require('mongodb').MongoClient

#Initialize Express App
const app = express()

#The stubs for the API endpoints:
app.post('/trip', (req,res) => { /* */ })
app.get('/trips', (req, res) => { /* */ })
app.post('/expense', (req, res) => { /* */ })
app.get('/expenses', (req, res) => { /* */ })

#Uses listen() to start the server
app.listen(3003, () => console.log('YAY, server ready!'))
