var express = require("express");
const Model_Users = require("../model/Model_Users");
const Model_Rekon = require("../model/Model_Rekon");
var router = express.Router();

/* GET superusers listing. */
router.get("/", async function (req, res, next) {
  try {
    let id = req.session.userId;
    let data = await Model_Users.getId(id);
    if (data.length > 0) {
      if (data[0].level_users !== "superusers") {
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
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          "Surabaya Selatan": {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Madura: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Sidoarjo: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Pasuruan: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Jember: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Malang: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Kediri: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Madiun: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Denpasar: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          Singaraja: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          NTB: {
            ASTINET: 0,
            VPNIP: 0,
            WIFI: 0,
            INTERNET: 0,
            VOICE: 0,
            IPTV: 0,
          },
          NTT: {
            ASTINET: 0,
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
          role: req.session.userRole,
          witelCounts: witelCounts,
          layananCounts: layananCounts,
          lastUpdated: lastUpdated, // Kirim lastUpdated ke template
        });
      }
    } else {
      res.status(401).json({ error: "User tidak ada" });
    }
  } catch (error) {
    res.status(501).json("Butuh akses login");
  }
});

module.exports = router;
