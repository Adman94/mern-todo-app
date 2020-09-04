const express = require('express')
const mongoose = require('mongoose')

const Todos = require('./dbModel')
// app config
const app = express()
const port = process.env.PORT || 9000

// middlewares
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

mongoose.connect('mongodb+srv://todoclient:pwjisawesome@cluster0.kyu5a.mongodb.net/todoclient?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

mongoose.connection.once('open', () => console.log('DB Connected'))

app.get('/', (req, res) => res.status(200).send('Hello World!'))

app.get('/gettodos', (req, res) => {
  Todos.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.post('/todos', (req, res) => {
  const dbTodo = req.body
  Todos.create(dbTodo, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

app.delete('/deltodos/:id', (req, res) => {
  Todos.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send({ status: "success", msg: "Delete success" })
    }
  })
})

app.listen(port, () => console.log(`listening on localhost:${port}`))