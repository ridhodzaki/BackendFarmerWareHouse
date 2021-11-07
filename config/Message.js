const requestResponse = {
  gagal: (pesan) => {
    return {
      sukses: false,
      pesan: pesan
    }
  },
  sukses: (pesan) => {
    return {
      sukses: true,
      pesan: pesan
    }
  },
  serverError: {
    sukses: false,
    pesan: 'Terjadi Kesalahan di Server'
  },
  sukseswithdata: (pesan, data) => {
    return {
      sukses: true,
      pesan: pesan,
      data: data
    }
  }
}

module.exports = { requestResponse }