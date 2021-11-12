const multer = require('multer')
const path = require('path')
const MAX_SIZE = 20000000
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './image')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || timeLog.mimetype === 'image/.png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_SIZE
  }
})

const cekNull = (fileUpload) => {
  if (fileUpload === null || fileUpload === undefined) {
    return null
  } else {
    var namaFile = ''
    for (const file of fileUpload) {
      namaFile = namaFile + ',' + file.filename
    }
    var array = namaFile.split(",")
    array.splice(0, 1)
    return array
  }
}

const deleteImage = (image) => {
  console.log(image)
  if (image !== undefined) {
    var i = 0;
    for (i; i < image.length; i++) {
      fs.unlinkSync(`./image/${image[i]}`)
    }
  }
}

module.exports = { multer, upload, cekNull, deleteImage }