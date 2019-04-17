const express = require('express')

const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017' // default port
//Express initialize: to connect client json query as middleware
//thats why we can access data from Request.body
const app = express()
app.use(express.json())

//Connects database (all), and the collections trips and expenses
let db, trips, expenses
mongo.connect(
  url,
  (err, client) => {
    if(err){
      console.error(err)
      return
    }
    db = client.db('tripcost')
    trips = db.collection('trips')
    expenses = db.collection('expenses')
  }
)

/*The stubs for the API endpoints:*/

// app.get('/', (req, res) => { /* */ })

app.post('/trip', (req, res) => {
  // Acces the new trip form data query vía express
  const name = req.body.name
  // now we have the name, we send it to the DB with insertOne (mongo method)
  trips.insertOne({ name: name }, (err, result) => {
    // and handle error and result responses
    if(err){
      console.error(err)
      res.status(500).json({err: err})
      return
    }
    console.log(result)
    res.status(200).json({ok: true})
    // por qué no lleva return en este caso?

  })
})
app.get('/trips', (req, res) => {
  // Mongo calling and array it
  trips.find().toArray((err, items) => {
    if(err){
      console.error(err)
      res.status(500).json({err: err})
    }
    res.status(200).json({ trips: items})
  })
})
app.post('/expense', (req, res) => { /* */ })
app.get('/expenses', (req, res) => { /* */ })

/*Uses listen() to start the server*/
app.listen(3003, () => console.log('YAY, server ready!'))
