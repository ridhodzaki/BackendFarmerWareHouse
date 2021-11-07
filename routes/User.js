const router = require('express').Router()
const userController = require('../controller/User')
const auth = require("../middleware/auth");

router.get('/testing', (req, res) => {
  res.send('Hello World, /n Access To Backend Successfully')
})

router.post('/register', (req, res) => {
  userController.register(req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.post('/login', (req, res) => {
  userController.login(req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router