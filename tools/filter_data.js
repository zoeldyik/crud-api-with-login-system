const array_data_penerimaan = (data)=>{
    return data.map(d=>{
        return {
            id : d._id,
            tanggal: d.tanggal,
            nama: d.nama,
            penerima: d.penerima,
            jumlah: d.jumlah,
        }
    })
}

const array_data_pengeluaran = (data)=>{
    return data.map(d=>{
        return {
            id : d._id,
            tanggal: d.tanggal,
            nama: d.nama,
            jumlah: d.jumlah,
        }
    })
}

const data_penerimaan = (data)=>{
    return{
        id: data._id,
        tanggal: data.tanggal,
        nama: data.nama,
        penerima: data.penerima,
        jumlah: data.jumlah
    }
}

const data_pengeluaran = (data)=>{
    return{
        id: data._id,
        tanggal: data.tanggal,
        nama: data.nama,
        jumlah: data.jumlah
    }
}


module.exports = {array_data_pengeluaran, array_data_penerimaan, data_penerimaan, data_pengeluaran};