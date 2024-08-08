
var express = require('express');
var router = express.Router();
// var connection = require('../config/database.js');
const Model_Kategori = require('../model/Model_Kategori');
const Model_Users = require('../model/Model_Users');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
// const pdfParse = require('pdf-parse');
// const mammoth = require('mammoth');
const axios = require('axios'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/documents');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Menampilkan Data Pada Page Users
router.get('/users', async function(req, res, next) {
    let rows = await Model_Kategori.getAll();
    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session
    res.render('kategori/users', {
        data: rows,
        role: role,
        email: email
    });
});



//Menampilkan Data Pada Page Admin
router.get('/admin', async function(req, res, next) {
    let rows = await Model_Kategori.getAll();
    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session
    res.render('kategori/admin/home', {
        data: rows,
        role: role,
        email: email
    });
});

//Menampilkan Data Pada Page SuperAdmin
router.get('/superadmin', async function(req, res, next){
    let rows = await Model_Kategori.getAll();
    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session
    res.render('kategori/superadmin/home', {
        data: rows,
        role: role,
        email: email
    });
});

//Menampilkan untuk Menambahkan Data Dengan Role Superadmin
router.get('/superadmin/create', function(req, res, next) {
    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session
    res.render('kategori/superadmin/create', { 
        nama_kategori: '',
        role: role,
        email: email
    });
});


// Menambahkan data dengan file unggahan (hanya Excel)
router.post('/store', upload.single('import_file'), async function(req, res, next) {
    let filePath = null;
    try {
        filePath = req.file ? req.file.path : null;
        const ext = filePath ? path.extname(req.file.originalname).toLowerCase() : '';

        if (filePath && (ext === '.xlsx' || ext === '.xls')) {
            const workbook = xlsx.readFile(filePath);
            const sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function(sheet) {
                const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
                jsonData.forEach(async (row) => {
                    if (row.nama_kategori) {
                        await Model_Kategori.store({ nama_kategori: row.nama_kategori });
                    }
                });
            });
        } else {
            throw new Error('File yang diunggah bukan file Excel.');
        }

        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/kategori/superadmin');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data');
        res.redirect('/kategori/superadmin/create');
    } finally {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Hapus file setelah digunakan
        }
    }
});


//mengedit data by id dengan Role superadmin 
router.get('/superadmin/edit/(:id)', async function(req, res, next) {
    let id = req.params.id;
    let rows = await Model_Kategori.getId(id);
    let data = await Model_Kategori.getAll();

    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session

    res.render('kategori/superadmin/edit', {
        id: rows[0].id_kategori,
        nama_kategori: rows[0].nama_kategori,
        data: data,
        role: role,
        email: email
    });
});


// Mendapatkan kategori berdasarkan ID
router.get('/admin/detail/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Kategori.getId(id);

        if (!rows || rows.length === 0) {
            return res.status(404).send('Category not found');
        }

        const role = req.session.userRole; // Assuming role is stored in session
        const email = req.session.userEmail; // Assuming email is stored in session

        res.render('kategori/admin/detail', {
            id: rows[0].id_kategori,
            nama_kategori: rows[0].nama_kategori,
            role: role,
            email: email
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
        await Model_Kategori.update(id, Data);
        req.flash('success', 'Berhasil memperbarui data!')
        res.redirect('/kategori/superadmin');
    } catch{
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.render('/kategori/superadmin/home');
    }
})

//Menghapus data  by id (Role Superadmin)
router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Kategori.delete(id);
    req.flash('success', 'Berhasil menghapus data!')
    res.redirect('/kategori/superadmin');
})

router.post('/admin/detail/status/:id', async (req, res) => {
    const { id } = req.params;
    const { level_acc } = req.body;
    try {
        const result = await Model_Kategori.updateStatus({ id, level_acc });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});


module.exports = router;