
var express = require('express');
var router = express.Router();
// var connection = require('../config/database.js');
const Model_Kategori = require('../model/Model_Kategori');

//Menampilkan Data Pada Page Users
router.get('/users', async function(req, res, next){
    let rows = await Model_Kategori.getAll();
    res.render('kategori/users',{
        data: rows
    })
})

//Menampilkan Data Pada Page Admin
router.get('/admin', async function(req, res, next){
    let rows = await Model_Kategori.getAll();
    res.render('kategori/admin/home',{
        data: rows
    })
})
//Menampilkan Data Pada Page SuperAdmin
router.get('/superadmin', async function(req, res, next){
    let rows = await Model_Kategori.getAll();
    res.render('kategori/index',{
        data: rows
    })
})

//Menampilkan untuk Menambahkan Data Dengan Role Superadmin
router.get('/superadmin/create', function(req, res, next) {
    res.render('kategori/superadmin/create', { 
      nama_kategori: '' 
    });
  });

//Menambahkan Data Dengan Role Superadmin
router.post('/store', async function(req,res,next){
    try{
        let {nama_kategori} = req.body;
        let Data = {
            nama_kategori
        }
        await Model_Kategori.Store(Data);
        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/kategori/admin');
    }catch{
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data')
        req.redirect('/kategori');
    }
})

//mengedit data by id dengan Role superadmin 
router.get('/superadmin/edit/(:id)', async function(req,res, next){
    let id = req.params.id;
    let rows = await Model_Kategori.getId(id);
    let data = await Model_Kategori.getAll();
    res.render('kategori/superadmin/edit', {
        id: rows[0].id_kategori,
        nama_kategori: rows[0].nama_kategori,
        data: data
    })
})

// Mendapatkan kategori berdasarkan ID
router.get('/admin/detail/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Kategori.getId(id);

        if (!rows || rows.length === 0) {
            return res.status(404).send('Category not found');
        }

        res.render('kategori/admin/detail', {
            id: rows[0].id_kategori,
            nama_kategori: rows[0].nama_kategori
        });
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});


// mengupdate Data by id dengan  Role Superadmin
router.post('/update/(:id)', async function(req,res, next){
    try{
        let id = req.params.id;
        let {nama_kategori} = req.body;
        let Data = {
            nama_kategori
        }
        await Model_Kategori.Update(id, Data);
        req.flash('success', 'Berhasil memperbarui data!')
        res.redirect('/kategori/super');
    } catch{
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.render('/kategori/superadmin/edit');
    }
})

//Menghapus data  by id (Role Superadmin)
router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Kategori.Delete(id);
    req.flash('success', 'Berhasil menghapus data!')
    res.redirect('/kategori/admin');
})

router.post('/approve/:id', async (req, res) => {
    let id = req.params.id;
    try {
        // Update status kategori menjadi 'approved'
        await Model_Kategori.Update(id, { status: 'approved' });
        req.flash('success', 'Kategori berhasil disetujui!');
        res.redirect('/kategori/admin');
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan saat menyetujui kategori');
        res.redirect('/kategori/admin'); // Atau arahkan ke halaman lain sesuai kebutuhan
    }
});

router.post('/reject/:id', async (req, res) => {
    let id = req.params.id;
    try {
        // Update status kategori menjadi 'rejected'
        await Model_Kategori.Update(id, { status: 'rejected' });
        req.flash('success', 'Kategori berhasil ditolak!');
        res.redirect('/kategori/admin');
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan saat menolak kategori');
        res.redirect('/kategori/admin'); // Atau arahkan ke halaman lain sesuai kebutuhan
    }
});


module.exports = router;