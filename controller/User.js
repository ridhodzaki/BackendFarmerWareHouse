const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { requestResponse } = require('../config/Message')

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      email: data.email
    }).then(user => {
      if (user) {
        reject(requestResponse.gagal('Email Telah Terdaftar'))
      } else {
        bcrypt.hash(data.password, 10, (err, hash) => {
          data.password = hash
          const token = jwt.sign(
            { user_id: data._id, email: data.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          )
          console.log(token)
          data.token = token
          userModel.create(data)
            .then(() => resolve(requestResponse.sukses('Berhasil Register User')))
            .catch((err) => {
              console.log(err)
              reject(requestResponse.gagal('Gagal Register User'))
            })
        })
      }
    }).catch(() => reject(requestResponse.serverError))
  })

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      email: data.email
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          const token = jwt.sign(
            { user_id: user._id, email: user.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "10h",
            }
          )
          user.token = token
          userModel.updateOne({
            email: user.email
          }, user)
            .then(() => {
              console.log(user)
              resolve(requestResponse.sukseswithdata('Berhasil Login', user))
            })
            .catch((err) => {
              console.log(err)
              reject(requestResponse.serverError)
            })
        } else {
          reject(requestResponse.gagal('Password Salah'))
        }
      } else {
        reject(requestResponse.gagal('Email Tidak Terdaftar'))
      }
    })
  })