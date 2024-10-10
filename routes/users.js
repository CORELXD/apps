var express = require("express");
const Model_Users = require("../model/Model_Users");
const Model_Rekon = require("../model/Model_Rekon"); // Pastikan untuk mengimpor Model_Rekon
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
    try {
        let id = req.session.userId;
        let data = await Model_Users.getId(id);
        if (data.length > 0) {
            if (data[0].level_users !== 'users') {
                res.redirect("/logout");
            } else {
                // Ambil semua data dari Model_Rekon
                let rows = await Model_Rekon.getAll();

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

                // Render template dengan data
                res.render("users/index", {
                    title: "Users Home",
                    email: data[0].email,
                    username: data[0].username,
                    role: req.session.userRole, // Pass the role to the EJS template
                    witelCounts: witelCounts // Kirim witelCounts ke view
                });
            }
        } else {
            res.status(401).json({ error: "user tidak ada" });
        }
    } catch (error) {
        res.status(501).json("Butuh akses login");
    }
});
module.exports = router;