
var express = require('express');
var router = express.Router();
// var connection = require('../config/database.js');
const Model_Rekon = require('../model/Model_Rekon');
const Model_Users = require('../model/Model_Users');
const fs = require('fs');
const multer = require('multer');
const excel = require('exceljs');
const path = require('path');
const xlsx = require('xlsx');


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
    let rows = await Model_Rekon.getAll();
    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session
    res.render('rekon/users', {
        data: rows,
        role: role,
        email: email
    });
});



//Menampilkan Data Pada Page Admin
router.get('/admin', async function(req, res, next) {
    let rows = await Model_Rekon.getAll();
    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session
    res.render('rekon/admin/home', {
        data: rows,
        role: role,
        email: email
    });
});

//Menampilkan Data Pada Page SuperAdmin
router.get('/superadmin', async function(req, res, next){
    let rows = await Model_Rekon.getAll();
    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session
    res.render('rekon/superadmin/home', {
        data: rows,
        role: role,
        email: email
    });
});

//untuk Menambahkan Data Dengan Role Superadmin
router.get('/superadmin/create', function(req, res, next) {
    const role = req.session.userRole; // Assuming role is stored in session
    const email = req.session.userEmail; // Assuming email is stored in session

    res.render('rekon/superadmin/create', {
        incident: '',
        customer: '',
        layanan: '',
        kategori: '',
        regional: '',
        witel: '',
        jenis_permintaan: '',
        reason: '',
        ttr_e2e_awal: '',
        ttr_after_reduksi: '',
        eviden_regional: '',
        catatan_sda: '',
        validasi_sda: '',
        approved_not_ppq: '',
        rep_rec: '',
        change_to: '',
        role: role,
        email: email
    });
});



// Menambahkan data dengan file ungguhan (hanya Excel)
router.post('/store', upload.single('import_file'), async function(req, res, next) {
    let filePath = null;
    try {
        filePath = req.file ? req.file.path : null;
        const ext = filePath ? path.extname(req.file.originalname).toLowerCase() : '';

        if (filePath && (ext === '.xlsx' || ext === '.xls')) {
            const workbook = xlsx.readFile(filePath);
            const sheet_name_list = workbook.SheetNames;

            for (const sheet of sheet_name_list) {
                const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

                for (const row of jsonData) {
                    // Log data untuk debug
                    console.log('Row Data:', row);

                    // Buat objek data berdasarkan kolom yang ada di tabel rekon
                    const data = {
                        incident: row['INCIDENT'] || '',
                        customer: row['CUSTOMER'] || '',
                        layanan: row['LAYANAN'] || '',
                        kategori: row['KATEGORI'] || '',
                        regional: row['REGIONAL'] || '',
                        witel: row['WITEL'] || '',
                        jenis_permintaan: row['JENIS PERMINTAAN'] || '', // Pastikan nama kolom sesuai
                        reason: row['REASON'] || '',
                        ttr_e2e_awal: row['TTR E2E AWAL'] || 0,
                        ttr_after_reduksi: row['TTR AFTER REDUKSI'] || 0,
                        eviden_regional: row['EVIDEN REGIONAL'] || '',
                        catatan_sda: row['CATATAN SDA'] || '',
                        validasi_sda: row['VALIDASI SDA'] || '',
                        approved_not_ppq: row['APPROVED/NOT (PPQ)'] || '',
                        rep_rec: row['REP_REC'] || '',
                        change_to: row['Change To'] || ''
                    };

                    // Log data sebelum disimpan
                    console.log('Data to be saved:', data);

                    // Simpan data ke database
                    await Model_Rekon.store(data);
                }
            }
        } else {
            throw new Error('File yang diunggah bukan file Excel.');
        }

        req.flash('success', 'Berhasil Menyimpan Data!');
        res.redirect('/rekon/superadmin');
    } catch (error) {
        console.error('Error:', error.message);
        req.flash('error', 'Terjadi kesalahan pada penyimpanan data');
        res.redirect('/rekon/superadmin/create');
    } finally {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Hapus file setelah digunakan
        }
    }
});


//mengedit data by id dengan Role superadmin 
router.get('/superadmin/edit/:id', async function(req, res, next) {
    let id = req.params.id;
    try {
        // Ambil data berdasarkan ID
        let rows = await Model_Rekon.getId(id);

        // Pastikan data ditemukan
        if (rows.length === 0) {
            req.flash('error', 'Data tidak ditemukan.');
            return res.redirect('/rekon/superadmin');
        }

        // Data dari baris pertama (karena ID unik, hanya satu baris yang diambil)
        let row = rows[0];

        // Ambil semua data untuk dropdown atau keperluan lainnya
        let data = await Model_Rekon.getAll();

        // Ambil role dan email dari session
        const role = req.session.userRole;
        const email = req.session.userEmail;

        // Render halaman edit dengan semua kolom dari tabel rekon
        res.render('rekon/superadmin/edit', {
            id_rekon: row.id_rekon,
            incident: row.incident,
            customer: row.customer,
            layanan: row.layanan,
            kategori: row.kategori,
            regional: row.regional,
            witel: row.witel,
            jenis_permintaan: row.jenis_permintaan,
            reason: row.reason,
            ttr_e2e_awal: row.ttr_e2e_awal,
            ttr_after_reduksi: row.ttr_after_reduksi,
            eviden_regional: row.eviden_regional,
            catatan_sda: row.catatan_sda,
            validasi_sda: row.validasi_sda,
            approved_not_ppq: row.approved_not_ppq,
            rep_rec: row.rep_rec,
            change_to: row.change_to,
            data: data,
            role: role,
            email: email
        });
    } catch (error) {
        console.error("Error in /superadmin/edit/:id:", error);
        req.flash('error', 'Terjadi kesalahan pada pengambilan data.');
        res.redirect('/rekon/superadmin');
    }
});



// Menampilkan kategori berdasarkan ID
router.get('/admin/detail/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_Rekon.getId(id); // Ambil data berdasarkan ID

        // Ambil role dan email dari session
        const role = req.session.userRole;
        const email = req.session.userEmail;

        // Pastikan data ditemukan
        if (rows.length > 0) {
            // Render halaman detail dengan semua kolom dari tabel rekon
            res.render('rekon/admin/detail', {
                data: rows, // Kirimkan data ke template
                role: role,
                email: email
            });
        } else {
            req.flash('error', 'Data tidak ditemukan.');
            res.redirect('/admin');
        }
    } catch (err) {
        console.error("Database query error in /admin/detail/:id:", err);
        req.flash('error', 'Terjadi kesalahan pada pengambilan data.');
        res.redirect('/admin/1');
    }
});

// Route untuk mengunduh file Excel
router.get('/admin/download', async function(req, res, next) {
    try {
        let rows = await Model_Rekon.getAll(); // Ambil semua data
        
        if (rows.length > 0) {
            // Membuat workbook dan worksheet
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Rekon Data');

            // Menambahkan header ke worksheet
            worksheet.columns = [
                { header: 'No', key: 'No', width: 5 },
                { header: 'Incident', key: 'incident', width: 10 },
                { header: 'Customer', key: 'customer', width: 30 },
                { header: 'Layanan', key: 'layanan', width: 25 },
                { header: 'Kategori', key: 'kategori', width: 25 },
                { header: 'Regional', key: 'regional', width: 25 },
                { header: 'Witel', key: 'witel', width: 25 },
                { header: 'Jenis Permintaan', key: 'jenis_permintaan', width: 25 },
                { header: 'Reason', key: 'reason', width: 30 },
                { header: 'TTR E2E Awal', key: 'ttr_e2e_awal', width: 20 },
                { header: 'TTR After Reduksi', key: 'ttr_after_reduksi', width: 20 },
                { header: 'Eviden Regional', key: 'eviden_regional', width: 30 },
                { header: 'Catatan SDA', key: 'catatan_sda', width: 30 },
                { header: 'Validasi SDA', key: 'validasi_sda', width: 30 },
                { header: 'Approved Not PPQ', key: 'approved_not_ppq', width: 30 },
                { header: 'REP REC', key: 'rep_rec', width: 30 },
                { header: 'Change To', key: 'change_to', width: 30 },
                { header: 'Status', key: 'level_acc', width: 20 }
            ];

             // Mengatur style header untuk bold
             worksheet.getRow(1).font = { bold: true };
             
            // Menambahkan data ke worksheet
            rows.forEach(row => {
                worksheet.addRow({
                    No: row.id_rekon, // Mapping id_rekon to No
                    incident: row.incident,
                    customer: row.customer,
                    layanan: row.layanan,
                    kategori: row.kategori,
                    regional: row.regional,
                    witel: row.witel,
                    jenis_permintaan: row.jenis_permintaan,
                    reason: row.reason,
                    ttr_e2e_awal: row.ttr_e2e_awal,
                    ttr_after_reduksi: row.ttr_after_reduksi,
                    eviden_regional: row.eviden_regional,
                    catatan_sda: row.catatan_sda,
                    validasi_sda: row.validasi_sda,
                    approved_not_ppq: row.approved_not_ppq,
                    rep_rec: row.rep_rec,
                    change_to: row.change_to,
                    level_acc: row.level_acc
                });
            });

            // Mengirim file Excel ke client
            res.setHeader('Content-Disposition', 'attachment; filename=rekon_data.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            await workbook.xlsx.write(res);
            res.end();
        } else {
            req.flash('error', 'Data tidak ditemukan untuk diunduh.');
            res.redirect('/admin');
        }
    } catch (err) {
        console.error("Error generating Excel file:", err);
        req.flash('error', 'Terjadi kesalahan dalam pembuatan file Excel.');
        res.redirect('/admin');
    }
});


// mengupdate Data by id dengan  Role Superadmin
router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { 
            incident, customer, layanan, kategori, regional, witel, jenis_permintaan, 
            reason, ttr_e2e_awal, ttr_after_reduksi, eviden_regional, catatan_sda, 
            validasi_sda, approved_not_ppq, rep_rec, change_to 
        } = req.body;

        // Siapkan data untuk diperbarui
        let Data = {
            incident,
            customer,
            layanan,
            kategori,
            regional,
            witel,
            jenis_permintaan,
            reason,
            ttr_e2e_awal,
            ttr_after_reduksi,
            eviden_regional,
            catatan_sda,
            validasi_sda,
            approved_not_ppq,
            rep_rec,
            change_to
        };

        // Perbarui data di database
        await Model_Rekon.update(id, Data);

        req.flash('success', 'Berhasil memperbarui data!');
        res.redirect('/rekon/superadmin');
    } catch (err) {
        console.error("Error in /update/:id:", err);
        req.flash('error', 'Terjadi kesalahan pada fungsi.');
        res.redirect('/rekon/superadmin');
    }
});


//Menghapus data  by id (Role Superadmin)
router.get('/delete/(:id)', async function(req, res, next){
    let id = req.params.id;
    await Model_Rekon.delete(id);
    req.flash('success', 'Berhasil menghapus data!')
    res.redirect('/rekon/superadmin');
})

// Mengupdate level_acc pada rekon berdasarkan ID
router.post('/admin/detail/:id', async (req, res) => {
    const { id } = req.params;
    const { level_acc } = req.body;
  
    try {
      // Validate level_acc before updating (optional)
      if (!["approve", "reject"].includes(level_acc)) {
        return res.status(400).json({ error: "Invalid level_acc value" });
      }
  
      // Call the updateLevelAcc function from Model_Rekon
      const result = await Model_Rekon.updateLevelAcc(id, level_acc);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Category not found" });
      }
  
      res.status(200).json({ message: "Level_acc updated successfully" });
    } catch (err) {
      console.error("Error in /admin/detail route:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  



module.exports = router;