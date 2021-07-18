const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
const baseURL = 'https://www.metaweather.com/api'
const users = [
  {
    id: 1,
    username: 'john',
    password: '1234',
    display_name: 'johnny',
    is_admin: true
  },
  {
    id: 2,
    username: 'luci',
    password: '1234',
    display_name: 'lucian',
    is_admin: false
  }
]

app.use(cors())

app.get('/login', (req, res) => {
  try {
    const foundUser = users.find((user) => user.username === req.query.username && user.password === req.query.password)
    res.send(foundUser)
  } catch (err) {
    res.send({ err })
  }
})

app.get('/location/search', (req, res) => {
  fetch(baseURL + '/location/search/?query=' + req.query.query)
    .then((res) => res.json())
    .then((data) => {
      res.send({ data })
    })
    .catch((err) => {
      res.send(err)
    })
})

app.get('/location/:woeid', (req, res) => {
  fetch(baseURL + '/location/' + req.params.woeid)
    .then((res) => res.json())
    .then((data) => {
      res.send({ data })
    })
    .catch((err) => {
      res.send(err)
    })
})
app.get('/location/:woeid/:date', (req, res) => {
  const { woeid, date } = req.params
  const year = date.slice(0, 4)
  const month = parseInt(date.slice(4, 6))
  const day = parseInt(date.slice(6, 8))
  fetch(`${baseURL}/location/${woeid}/${year}/${month}/${day}`)
    .then((res) => res.json())
    .then((data) => {
      res.send({ data })
    })
    .catch((err) => {
      res.send(err)
    })
})

const server = app.listen(4000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
