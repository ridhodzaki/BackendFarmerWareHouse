const kategoriModel = require('../model/Kategori');
const { requestResponse } = require('../config/Message')
const auth = require('../middleware/auth')
const router = require('express').Router()

router.post('/input', auth, async (req, res) => {
  try {
    // console.log(req.body)
    const data = req.body
    console.log(data)
    if (!(data)) {
      res.status(400).send('Masukan Kategori');
    }
    const oldKategori = await kategoriModel.findOne({ Kategori: data.Kategori });

    if (oldKategori) {
      return res.status(409).send('Kategori Telah Ada');
    } else {
      kategoriModel.create(data)
        .then(() => {
          res.send(requestResponse.sukses('Berhasil Menambahkan Kategori'));
        })
    }
  } catch (err) {
    console.log(err)
  }
})

router.get('/dataKategori', async (req, res) => {
  try {
    kategoriModel.find({})
      .then((kategori) => {
        res.send(requestResponse.sukseswithdata('Berhasil', kategori))
      })
  } catch (err) {
    console.log(err)
  }
})

router.put('/edit/:id', auth, async (req, res) => {
  try {
    // console.log(req.body)
    const data = req.body
    const id = req.params.id
    console.log(data)
    kategoriModel.updateOne({
      id: id
    }, data)
      .then(() => {
        res.send(requestResponse.sukses('Berhasil Merubah Kategori'));
      }).catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }
})

router.delete('/hapus/:id', auth, async (req, res) => {
  try {
    const id = req.params.id
    kategoriModel.deleteOne({
      id: id
    }).then(() => {
      res.send(requestResponse.sukses('Berhasil Menghapus Kategori'));
    }).catch((err) => {
      console.log(err)
    })
  } catch (err) {
    console.log(err)
  }
})


module.exports = router