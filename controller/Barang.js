const barangModel = require('../model/Barang')
const { requestResponse } = require('../config/message')
const { deleteImage } = require('../config/uploadConfig')

exports.inputBarang = (data) =>
  new Promise((resolve, reject) => {
    barangModel.findOne({
      namaBarang: data.namaBarang
    }).then(barang => {
      if (barang) {
        reject(requestResponse.gagal('Barang Telah Terdaftar'))
      } else {
        barangModel.create(data)
        .then(() => resolve(requestResponse.sukses('Berhasil Input Barang')))
        .catch((err) => {
          console.log(err)
          reject(requestResponse.gagal('Gagal Input Barang'))
        })
      }
    }).catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.dataBarang = () =>
  new Promise((resolve, reject) => {
    barangModel.find({})
    .then((barang) => {
      resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan Barang', barang))
    })
    .catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.detailBarang = (id) => 
  new Promise((resolve, reject) => {
    barangModel.findOne({
      _id: id
    }).then((barang) => {
      resolve(requestResponse.sukseswithdata('Berhasil Mendapatkan Satu Barang', barang))
    }).catch((err) => {
      console.log(err)
      reject(requestResponse.serverError)
    })
  })

exports.editBarang = (id, data, changeImage) =>
  new Promise((resolve, reject) => {
    barangModel.findOne({
      _id: id
    }).then((barang) => {
      let dataBaru = data
      if (changeImage) {
        deleteImage(data.oldImage)
      } else {
        dataBaru = Object.assign(data, {
          image: barang.image
        })
      }
      barangModel.updateOne({
        _id: id
      }, dataBaru).then(() => {
        resolve(requestResponse.sukses('Berhasil Mengupdate Barang'))
      }).catch((err) => {
        console.log(err)
        reject(requestResponse.serverError)
      })
    })
  })

exports.deleteBarang = (id) =>
  new Promise((resolve, reject) => {
    barangModel.findOne({
      _id: id
    }).then((barang) => {
      barangModel.deleteOne({
        _id: id
      }).then(() => {
        deleteImage(barang.image)
        resolve(requestResponse.sukses('Berhasil Menghapus Barang'))
      }).catch((err) => {
        console.log(err)
        reject(requestResponse.serverError)
      })
    })
  })