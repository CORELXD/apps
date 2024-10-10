var express = require("express");
var router = express.Router();
// var connection = require('../config/database.js');
const Model_Rekon = require("../model/Model_Rekon");
const Model_Users = require("../model/Model_Users");
const sharp = require("sharp");
const fs = require("fs");
const multer = require("multer");
const excel = require("exceljs");
const path = require("path");
const xlsx = require("xlsx");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/upload/')); // Sesuaikan dengan path direktori
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    const baseName = path.basename(originalName, fileExtension);
    let newName = originalName;
    let count = 1;

    // Cek apakah file dengan nama yang sama sudah ada
    while (fs.existsSync(path.join(__dirname, '../public/images/upload/', newName))) {
      newName = `${baseName}(${count})${fileExtension}`; // Mengubah nama file untuk menghindari konflik
      count++;
    }

    cb(null, newName); // Simpan dengan nama yang telah dimodifikasi
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
});

// Menampilkan Data Pada Page Users
router.get("/users", async function (req, res, next) {
  let id = req.session.userId;
  let rows2 = await Model_Users.getId(id);
  let rows = await Model_Rekon.getAll();
  const role = req.session.userRole;
  const email = req.session.userEmail;

  // Inisialisasi witelCounts
  const witelCounts = {
      'Surabaya Utara': 0,
      'Surabaya Selatan': 0,
      'Madura': 0,
      'Sidoarjo': 0,
      'Pasuruan': 0,
      'Jember': 0,
      'Malang': 0,
      'Kediri': 0,
      'Madiun': 0,
      'Denpasar': 0,
      'Singaraja': 0,
      'NTB': 0,
      'NTT': 0,  
    };

  // Hitung jumlah untuk setiap witel
  rows.forEach((item) => {
      if (item.witel in witelCounts) {
          witelCounts[item.witel]++;
      }
  });

  res.render("rekon/users", {
      data: rows,
      role: role,
      username: rows2[0].username,
      email: email,
      witelCounts: witelCounts, // Kirim witelCounts ke view
  });
});

// Menampilkan Data Pada Page Users
router.get("/superusers", async function (req, res, next) {
  let id = req.session.userId;
  let rows2 = await Model_Users.getId(id);
  let rows = await Model_Rekon.getAll();
  const role = req.session.userRole;
  const email = req.session.userEmail;

  // Inisialisasi witelCounts
  const witelCounts = {
      'Surabaya Utara': 0,
      'Surabaya Selatan': 0,
      'Madura': 0,
      'Sidoarjo': 0,
      'Pasuruan': 0,
      'Jember': 0,
      'Malang': 0,
      'Kediri': 0,
      'Madiun': 0,
      'Denpasar': 0,
      'Singaraja': 0,
      'NTB': 0,
      'NTT': 0,  
    };

  // Hitung jumlah untuk setiap witel
  rows.forEach((item) => {
      if (item.witel in witelCounts) {
          witelCounts[item.witel]++;
      }
  });

  res.render("rekon/superusers/home", {
      data: rows,
      role: role,
      username: rows2[0].username,
      email: email,
      witelCounts: witelCounts, // Kirim witelCounts ke view
  });
});

//Menampilkan Data Pada Page Admin
router.get("/admin", async function (req, res, next) {
  let id = req.session.userId;
  let rows2 = await Model_Users.getId(id);
  let rows = await Model_Rekon.getAll();
  const role = req.session.userRole;
  const email = req.session.userEmail;

  // Inisialisasi witelCounts
  const witelCounts = {
      'Surabaya Utara': 0,
      'Surabaya Selatan': 0,
      'Madura': 0,
      'Sidoarjo': 0,
      'Pasuruan': 0,
      'Jember': 0,
      'Malang': 0,
      'Kediri': 0,
      'Madiun': 0,
      'Denpasar': 0,
      'Singaraja': 0,
      'NTB': 0,
      'NTT': 0,  
    };

  // Hitung jumlah untuk setiap witel
  rows.forEach((item) => {
      if (item.witel in witelCounts) {
          witelCounts[item.witel]++;
      }
  });

  res.render("rekon/admin/home", {
      data: rows,
      role: role,
      username: rows2[0].username,
      email: email,
      witelCounts: witelCounts, // Kirim witelCounts ke view
  });
});

//Menampilkan Data Pada Page SuperAdmin
router.get("/superadmin", async function (req, res, next) {
  let id = req.session.userId;
  let rows2 = await Model_Users.getId(id);
  let rows = await Model_Rekon.getAll();
  const role = req.session.userRole;
  const email = req.session.userEmail;

  // Inisialisasi witelCounts
  const witelCounts = {
      'Surabaya Utara': 0,
      'Surabaya Selatan': 0,
      'Madura': 0,
      'Sidoarjo': 0,
      'Pasuruan': 0,
      'Jember': 0,
      'Malang': 0,
      'Kediri': 0,
      'Madiun': 0,
      'Denpasar': 0,
      'Singaraja': 0,
      'NTB': 0,
      'NTT': 0,  
    };

  // Hitung jumlah untuk setiap witel
  rows.forEach((item) => {
      if (item.witel in witelCounts) {
          witelCounts[item.witel]++;
      }
  });

  res.render("rekon/superadmin/home", {
      data: rows,
      role: role,
      username: rows2[0].username,
      email: email,
      witelCounts: witelCounts, // Kirim witelCounts ke view
  });
});

//untuk Menambahkan Data Dengan Role Superadmin
router.get("/superadmin/create", async function (req, res, next) {
  const userId = req.session.userId; // Ambil userId dari session
  const role = req.session.userRole; // Ambil role dari session
  const email = req.session.userEmail; // Ambil email dari session

  try {
    // Ambil data pengguna berdasarkan userId dari session
    const [rows, data] = await Promise.all([
      Model_Users.getId(userId),
      Model_Rekon.getAll(), // Ambil semua data rekon jika diperlukan untuk dropdown atau keperluan lain
    ]);

    // Pastikan data pengguna ditemukan
    if (rows.length === 0) {
      req.flash("error", "Data pengguna tidak ditemukan.");
      return res.redirect("/rekon/superadmin");
    }

    // Ambil data pengguna dari baris pertama
    const username = rows[0].username;

    // Render halaman create dengan data yang diperlukan
    res.render("rekon/superadmin/create", {
      incident: "",
      customer: "",
      layanan: "",
      kategori: "",
      regional: "",
      witel: "",
      jenis_permintaan: "",
      reason: "",
      ttr_e2e_awal: "",
      ttr_after_reduksi: "",
      ttr_after_reduksi: "",
      eviden: "",
      catatan_sda: "",
      validasi_sda: "",
      approved_not_ppq: "",
      rep_rec: "",
      change_to: "",
      data: data, // Data rekon untuk dropdown atau keperluan lain
      username: username, // Pastikan username dikirim ke view
      role: role,
      email: email,
    });
  } catch (error) {
    console.error("Error in /superadmin/create:", error);
    req.flash("error", "Terjadi kesalahan pada pengambilan data.");
    res.redirect("/rekon/superadmin");
  }
});

// Menambahkan data dengan file ungguhan (Excel dan gambar)
router.post(
  '/store',
  upload.fields([
    { name: 'import_file', maxCount: 1 },
    { name: 'eviden', maxCount: 1 }
  ]),
  async (req, res, next) => {
    let filePath = null;
    let imagePath = null;

    try {
      filePath = req.files['import_file'] ? req.files['import_file'][0].path : null;
      imagePath = req.files['eviden'] ? req.files['eviden'][0].path : null;

      const ext = filePath ? path.extname(req.files['import_file'][0].originalname).toLowerCase() : '';
      if (filePath && (ext === '.xlsx' || ext === '.xls')) {
        const workbook = xlsx.readFile(filePath);
        const sheet_name_list = workbook.SheetNames;

        for (const sheet of sheet_name_list) {
          const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

          for (const row of jsonData) {
            const data = {
              incident: row['INCIDENT'] || '',
              customer: row['CUSTOMER'] || '',
              layanan: row['LAYANAN'] || '',
              kategori: row['KATEGORI'] || '',
              regional: row['REGIONAL'] || '',
              witel: row['WITEL'] || '',
              jenis_permintaan: row['JENIS PERMINTAAN'] || '',
              reason: row['REASON'] || '',
              ttr_e2e_awal: row['TTR E2E AWAL'] || 0,
              ttr_after_reduksi: row['TTR AFTER REDUKSI'] || 0,
              eviden: imagePath ? path.basename(imagePath) : row['EVIDEN REGIONAL'] || '',
              catatan_sda: row['CATATAN SDA'] || '',
              validasi_sda: row['VALIDASI SDA'] || '',
              approved_not_ppq: row['APPROVED/NOT (PPQ)'] || '',
              rep_rec: row['REP_REC'] || '',
              change_to: row['Change To'] || ''
            };

            await Model_Rekon.store(data);
          }
        }
        req.flash('success', 'Data berhasil disimpan!');
        res.redirect('/rekon/superadmin');
      } else {
        throw new Error('File yang diunggah bukan file Excel.');
      }
    } catch (error) {
      console.error('Kesalahan:', error.message);
      req.flash('error', 'Terjadi kesalahan saat menyimpan data');
      res.redirect('/rekon/superadmin/create');
    } finally {
      // Hapus file Excel setelah proses selesai, jika diperlukan
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }
);


//mengedit data by id dengan Role superadmin
router.get("/superadmin/edit/:id", async function (req, res, next) {
  const id = req.params.id;
  const userId = req.session.userId; // Ambil userId dari session

  try {
    // Ambil data berdasarkan ID
    const [row, rows2, data] = await Promise.all([
      Model_Rekon.getId(id),
      Model_Users.getId(userId), // Ambil data user berdasarkan userId dari session
      Model_Rekon.getAll(),
    ]);

    // Pastikan data ditemukan
    if (row.length === 0) {
      req.flash("error", "Data tidak ditemukan.");
      return res.redirect("/rekon/superadmin");
    }

    // Data dari baris pertama (karena ID unik, hanya satu baris yang diambil)
    const rekonRow = row[0];

    // Ambil role dan email dari session
    const role = req.session.userRole;
    const email = req.session.userEmail;

    // Render halaman edit dengan semua kolom dari tabel rekon
    res.render("rekon/superadmin/edit", {
      id_rekon: rekonRow.id_rekon,
      incident: rekonRow.incident,
      customer: rekonRow.customer,
      layanan: rekonRow.layanan,
      kategori: rekonRow.kategori,
      regional: rekonRow.regional,
      witel: rekonRow.witel,
      jenis_permintaan: rekonRow.jenis_permintaan,
      reason: rekonRow.reason,
      ttr_e2e_awal: rekonRow.ttr_e2e_awal,
      ttr_after_reduksi: rekonRow.ttr_after_reduksi,
      eviden: rekonRow.eviden,
      catatan_sda: rekonRow.catatan_sda,
      validasi_sda: rekonRow.validasi_sda,
      approved_not_ppq: rekonRow.approved_not_ppq,
      rep_rec: rekonRow.rep_rec,
      change_to: rekonRow.change_to,
      data: data,
      username: rows2[0].username, // Pastikan username dikirim ke view
      role: role,
      email: email,
    });
  } catch (error) {
    console.error("Error in /superadmin/edit/:id:", error);
    req.flash("error", "Terjadi kesalahan pada pengambilan data.");
    res.redirect("/rekon/superadmin");
  }
});

//update data by id dengan Role superadmin
router.post('/update/:id', (req, res, next) => {
  upload.array('eviden', 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Jika terjadi error karena ukuran file melebihi batas
      if (err.code === 'LIMIT_FILE_SIZE') {
        req.flash("error", "Ukuran file melebihi 5MB. Silakan unggah file dengan ukuran lebih kecil.");
        return res.redirect("/rekon/superadmin");
      }
    } else if (err) {
      // Penanganan error lainnya
      console.error("Error during file upload:", err);
      req.flash("error", "Terjadi kesalahan saat mengunggah file.");
      return res.redirect("/rekon/superadmin");
    }
    
    // Lanjutkan ke proses berikutnya jika tidak ada error
    next();
  });
}, async (req, res) => {
  try {
    let id = req.params.id;
    let files = req.files;
    
    // Mendapatkan data dari database berdasarkan ID
    let rows = await Model_Rekon.getId(id);
    let evidenLama = rows[0].eviden;
    
    let eviden;
    if (files.length > 0) {
      // Hapus file lama jika ada file baru
      if (evidenLama) {
        const pathEvidenLama = path.join(__dirname, '../public/images/upload', evidenLama);
        if (fs.existsSync(pathEvidenLama)) {
          fs.unlinkSync(pathEvidenLama);
          console.log("File lama berhasil dihapus:", evidenLama);
        }
      }
      // Simpan nama file baru
      eviden = files.map(file => file.filename).join(',');
    } else {
      // Gunakan gambar lama jika tidak ada file baru
      eviden = evidenLama;
    }

    // Mendapatkan data lain dari form
    let {
      incident, customer, layanan, kategori, regional, witel, jenis_permintaan,
      reason, ttr_e2e_awal, ttr_after_reduksi, catatan_sda, validasi_sda,
      approved_not_ppq, rep_rec, change_to
    } = req.body;

    // Update data di database
    let data = {
      incident, customer, layanan, kategori, regional, witel, jenis_permintaan,
      reason, ttr_e2e_awal, ttr_after_reduksi, eviden, catatan_sda, validasi_sda,
      approved_not_ppq, rep_rec, change_to
    };

    await Model_Rekon.update(id, data);

    // Kirim notifikasi berhasil
    req.flash("success", "Berhasil memperbarui data!");
    res.redirect("/rekon/superadmin");
  } catch (err) {
    console.error("Error in /update/:id:", err);
    req.flash("error", "Terjadi kesalahan saat memperbarui data.");
    res.redirect("/rekon/superadmin");
  }
});



// Menghapus data by ID dengan Role Superadmin
router.get("/delete/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    // Ambil data berdasarkan ID untuk mendapatkan nama file gambar
    const rows = await Model_Rekon.getId(id);
    const namaFileGambar = rows[0].eviden;

    // Hapus data dari database
    await Model_Rekon.delete(id);

    // Jika ada nama file gambar, hapus file gambar dari sistem file
    if (namaFileGambar) {
      const pathFile = path.join(__dirname, '../public/images', namaFileGambar);
      if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
      }
    }

    req.flash("success", "Berhasil menghapus data!");
    res.redirect("/rekon/superadmin");
  } catch (err) {
    console.error("Error in /delete/:id:", err);
    req.flash("error", "Terjadi kesalahan pada penghapusan data.");
    res.redirect("/rekon/superadmin");
  }
});

//mengedit data by id dengan Role superusers
router.get("/superusers/edit/:id", async function (req, res, next) {
  const id = req.params.id;
  const userId = req.session.userId; // Ambil userId dari session
  
  try {
    
    // Ambil data berdasarkan ID
    const [row, rows2, data] = await Promise.all([
      Model_Rekon.getId(id),
      Model_Users.getId(userId), // Ambil data user berdasarkan userId dari session
      Model_Rekon.getAll(),
    ]);

    // Pastikan data ditemukan
    if (row.length === 0) {
      req.flash("error", "Data tidak ditemukan.");
      return res.redirect("/rekon/superadmin");
    }

    // Data dari baris pertama (karena ID unik, hanya satu baris yang diambil)
    const rekonRow = row[0];

    // Ambil role dan email dari session
    const role = req.session.userRole;
    const email = req.session.userEmail;

    // Render halaman edit dengan semua kolom dari tabel rekon
    res.render("rekon/superusers/edit", {
      id_rekon: rekonRow.id_rekon,
      incident: rekonRow.incident,
      customer: rekonRow.customer,
      layanan: rekonRow.layanan,
      kategori: rekonRow.kategori,
      regional: rekonRow.regional,
      witel: rekonRow.witel,
      jenis_permintaan: rekonRow.jenis_permintaan,
      reason: rekonRow.reason,
      ttr_e2e_awal: rekonRow.ttr_e2e_awal,
      ttr_after_reduksi: rekonRow.ttr_after_reduksi,
      eviden: rekonRow.eviden,
      catatan_sda: rekonRow.catatan_sda,
      validasi_sda: rekonRow.validasi_sda,
      approved_not_ppq: rekonRow.approved_not_ppq,
      rep_rec: rekonRow.rep_rec,
      change_to: rekonRow.change_to,
      data: data,
      username: rows2[0].username, // Pastikan username dikirim ke view
      role: role,
      email: email,
    });
  } catch (error) {
    console.error("Error in /superusers/edit/:id:", error);
    req.flash("error", "Terjadi kesalahan pada pengambilan data.");
    res.redirect("/rekon/superusers");
  }
});


// Update data by id dengan Role superuser
router.post('/superusers/update/:id', (req, res, next) => {
  upload.array('eviden', 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Jika terjadi error karena ukuran file melebihi batas
      if (err.code === 'LIMIT_FILE_SIZE') {
        req.flash("error", "Ukuran file melebihi 5MB. Silakan unggah file dengan ukuran lebih kecil.");
        return res.redirect("/rekon/superusers");
      }
    } else if (err) {
      // Penanganan error lainnya
      console.error("Error during file upload:", err);
      req.flash("error", "Terjadi kesalahan saat mengunggah file.");
      return res.redirect("/rekon/superusers");
    }
    
    // Lanjutkan ke proses berikutnya jika tidak ada error
    next();
  });
}, async (req, res) => {
  try {
    let id = req.params.id;
    let files = req.files;
    
    // Mendapatkan data dari database berdasarkan ID
    let rows = await Model_Rekon.getId(id);
    let evidenLama = rows[0].eviden;
    
    // Jika ada file baru yang diunggah
    let eviden;
    if (files.length > 0) {
      // Hapus file lama jika ada file baru
      if (evidenLama) {
        const pathEvidenLama = path.join(__dirname, '../public/images/upload', evidenLama);
        if (fs.existsSync(pathEvidenLama)) {
          fs.unlinkSync(pathEvidenLama);
          console.log("File lama berhasil dihapus:", evidenLama);
        }
      }
      // Simpan nama file baru
      eviden = files.map(file => file.filename).join(',');
    } else {
      // Jika tidak ada file baru, tetap gunakan file lama
      eviden = evidenLama;
    }

    // Mendapatkan data lain dari form
    let {
      incident, customer, layanan, kategori, regional, witel, jenis_permintaan,
      reason, ttr_e2e_awal, ttr_after_reduksi, catatan_sda, validasi_sda,
      approved_not_ppq, rep_rec, change_to
    } = req.body;

    // Update data di database
    let data = {
      incident, customer, layanan, kategori, regional, witel, jenis_permintaan,
      reason, ttr_e2e_awal, ttr_after_reduksi, eviden, catatan_sda, validasi_sda,
      approved_not_ppq, rep_rec, change_to
    };

    await Model_Rekon.update(id, data);

    // Kirim notifikasi berhasil
    req.flash("success", "Berhasil memperbarui data!");
    res.redirect("/rekon/superusers");
  } catch (err) {
    console.error("Error in /update/:id:", err);
    req.flash("error", "Terjadi kesalahan saat memperbarui data.");
    res.redirect("/rekon/superusers");
  }
});


// Menampilkan kategori berdasarkan ID
router.get("/admin/detail/:id", async function (req, res, next) {
  const { id } = req.params;
  const { userId, userRole, userEmail } = req.session;

  try {
    // Ambil data rekon dan data user secara bersamaan
    const [rows, rows2] = await Promise.all([
      Model_Rekon.getId(id),
      Model_Users.getId(userId),
    ]);

    // Pastikan data rekon ditemukan
    if (rows.length === 0) {
      req.flash("error", "Data tidak ditemukan.");
      return res.redirect("/admin");
    }

    // Render halaman detail
    res.render("rekon/admin/detail", {
      data: rows,
      role: userRole,
      username: rows2[0].username,
      email: userEmail,
    });
  } catch (err) {
    console.error("Database query error:", err);
    req.flash("error", "Terjadi kesalahan pada pengambilan data.");
    res.redirect("/admin");
  }
});

// Route untuk mengunduh file Excel
router.get("/admin/download", async function (req, res, next) {
  try {
    let rows = await Model_Rekon.getAll(); // Ambil semua data

    if (rows.length > 0) {
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Rekon Data");

      worksheet.columns = [
        { header: "No", key: "No", width: 5 },
        { header: "Incident", key: "incident", width: 10 },
        { header: "Customer", key: "customer", width: 10 },
        { header: "Layanan", key: "layanan", width: 10 },
        { header: "Kategori", key: "kategori", width: 30 },
        { header: "Regional", key: "regional", width: 10 },
        { header: "Witel", key: "witel", width: 10 },
        { header: "Jenis Permintaan", key: "jenis_permintaan", width: 18 },
        { header: "Reason", key: "reason", width: 18 },
        { header: "TTR E2E Awal", key: "ttr_e2e_awal", width: 18 },
        { header: "TTR After Reduksi", key: "ttr_after_reduksi", width: 18 },
        { header: "Eviden", key: "eviden", width: 30 },
        { header: "Catatan SDA", key: "catatan_sda", width: 18 },
        { header: "Validasi SDA", key: "validasi_sda", width: 17 },
        { header: "Approved Not PPQ", key: "approved_not_ppq", width: 22 },
        { header: "REP REC", key: "rep_rec", width: 15 },
        { header: "Change To", key: "change_to", width: 15 },
        { header: "Status", key: "level_acc", width: 10 }
      ];

      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };

      let index = 1;
      for (const row of rows) {
        const rowIndex = worksheet.addRow({
          No: index++,
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
          eviden: '', // Kosong untuk gambar
          catatan_sda: row.catatan_sda,
          validasi_sda: row.validasi_sda,
          approved_not_ppq: row.approved_not_ppq,
          rep_rec: row.rep_rec,
          change_to: row.change_to,
          level_acc: row.level_acc,
        }).number;

        worksheet.getRow(rowIndex).alignment = { horizontal: 'center', vertical: 'middle' };

        if (row.eviden) {
          let evidenArray;
          try {
            evidenArray = JSON.parse(row.eviden);
            if (!Array.isArray(evidenArray)) {
              evidenArray = [row.eviden];
            }
          } catch (e) {
            evidenArray = row.eviden.split(',');
          }

          const totalImages = evidenArray.length;

          const maxWidth = 150;
          const maxHeight = 130;
          const heightPerImage = maxHeight / totalImages;

          for (const evidenItem of evidenArray) {
            const imagePath = path.join(__dirname, '../public/images/upload/', evidenItem.trim());
            
            if (fs.existsSync(imagePath)) {
              const compressedImagePath = path.join(__dirname, '../public/images/upload/', 'compressed_' + evidenItem.trim());
              
              await sharp(imagePath)
                .resize({ width: 800 }) // Sesuaikan ukuran
                .jpeg({ quality: 80 }) // Kompresi gambar
                .toFile(compressedImagePath);

              const imageId = workbook.addImage({
                filename: compressedImagePath,
                extension: path.extname(compressedImagePath).slice(1),
              });

              worksheet.addImage(imageId, {
                tl: { col: 11, row: rowIndex - 1 },
                ext: { width: maxWidth, height: heightPerImage }, 
              });
            }
          }

          worksheet.getRow(rowIndex).height = heightPerImage * totalImages;
        }
      }

      worksheet.eachRow({ includeEmpty: true }, (row) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FF000000' } },
            left: { style: 'thin', color: { argb: 'FF000000' } },
            bottom: { style: 'thin', color: { argb: 'FF000000' } },
            right: { style: 'thin', color: { argb: 'FF000000' } }
          };
        });
      });

      res.setHeader("Content-Disposition", "attachment; filename=rekon_data.xlsx");
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      await workbook.xlsx.write(res);
      res.end();
    } else {
      req.flash("error", "Data tidak ditemukan untuk diunduh.");
      res.redirect("/admin");
    }
  } catch (err) {
    console.error("Error generating Excel file:", err);
    req.flash("error", "Terjadi kesalahan dalam pembuatan file Excel.");
    res.redirect("/admin");
  }
});


// Mengupdate level_acc pada rekon berdasarkan ID
router.post("/admin/detail/:id", async (req, res) => {
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
