var express = require("express");
const Model_Users = require("../model/Model_Users");
const Model_Rekon = require("../model/Model_Rekon"); // Pastikan untuk mengimpor Model_Rekon
var router = express.Router();

/* GET superadmin listing. */
router.get("/", async function (req, res, next) {
  try {
    let id = req.session.userId;
    let data = await Model_Users.getId(id);
    if (data.length > 0) {
      if (data[0].level_users !== "superadmin") {
        res.redirect("/logout");
      } else {
        // Ambil semua data dari Model_Rekon
        let rows = await Model_Rekon.getAll();

        // Inisialisasi witelCounts
        const witelCounts = {
          "Surabaya Utara": 0,
          "Surabaya Selatan": 0,
          Madura: 0,
          Sidoarjo: 0,
          Pasuruan: 0,
          Jember: 0,
          Malang: 0,
          Kediri: 0,
          Madiun: 0,
          Denpasar: 0,
          Singaraja: 0,
          NTB: 0,
          NTT: 0,
        };

        // Inisialisasi objek untuk menghitung layanan
        const layananCounts = {
          "Surabaya Utara": {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          "Surabaya Selatan": {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Madura: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Sidoarjo: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Pasuruan: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Jember: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Malang: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Kediri: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Madiun: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Denpasar: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Singaraja: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          NTB: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          NTT: {
            ASTINER: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
        };

        // Hitung jumlah untuk setiap witel dan layanan
        rows.forEach((item) => {
          if (item.witel in layananCounts) {
            // Hitung jumlah layanan berdasarkan item
            if (item.layanan in layananCounts[item.witel]) {
              layananCounts[item.witel][item.layanan]++;
            }
          }
        });

        // Ambil waktu terakhir diperbarui
        let lastUpdated = null; // Inisialisasi sebagai null

        rows.forEach((item) => {
          // Jika last_updated ada dan lebih baru dari lastUpdated yang tersimpan
          if (item.last_updated) {
            const itemUpdated = new Date(item.last_updated);
            if (!lastUpdated || itemUpdated > lastUpdated) {
              lastUpdated = itemUpdated; // Simpan waktu terbaru
            }
          }
        });

        // Konversi lastUpdated ke string jika ada
        lastUpdated = lastUpdated ? lastUpdated.toISOString() : null; // Mengubah ke format ISO untuk dikirim ke template

        // Render template dengan data
        res.render("users/superusers", {
          title: "Superusers Home",
          email: data[0].email,
          username: data[0].username,
          role: req.session.userRole, // Pass the role to the EJS template
          witelCounts: witelCounts, // Kirim witelCounts ke view jika masih dibutuhkan
          layananCounts: layananCounts, // Kirim layananCounts ke view
          lastUpdated: lastUpdated, // Kirim last_updated ke view
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
