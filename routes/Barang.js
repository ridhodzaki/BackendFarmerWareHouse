const router = require('express').Router()
const barangController = require('../controller/Barang')
const auth = require("../middleware/auth")
const uploadSetting = require('../config/uploadConfig')
const fields = uploadSetting.upload.fields([
  {
    name: 'image',
    maxCount: 10
  }
])

router.post('/input', auth, fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])

  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName
  })
  console.log(data)

  barangController.inputBarang(data)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/dataBarang', (req, res) => {
  barangController.dataBarang()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/dataBarang/:id', auth, (req, res) => {
  barangController.detailBarang(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.put('/editBarang/:id', auth, fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])

  let data = JSON.parse(req.body.data)
  let changeImage = false
  if (imageName) {
    changeImage = true
    data = Object.assign(data, {
      image: imageName,
      oldImage: data.image
    })
  }
  console.log(changeImage)
  barangController.editBarang(req.params.id, data, changeImage)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.delete('/deleteBarang/:id', auth, (req, res) => {
  barangController.deleteBarang(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router