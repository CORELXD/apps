const connection = require('../config/database');

class Model_Kategori {
    // Mengambil semua data
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk ORDER BY id_kategori DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Menyimpan data
    static async store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO produk SET ?', Data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Mengambil data berdasarkan ID
    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM produk WHERE id_kategori = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Mengupdate status
static async updateStatus(data) {
        return new Promise((resolve, reject) => {
            const { id, Data } = data;
            const sql = 'UPDATE produk SET level_acc = ? WHERE id_kategori = ?';
            connection.query(sql, [Data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }


    // Mengupdate data
    static async update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE produk SET ? WHERE id_kategori = ?', [Data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Menghapus data
    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM produk WHERE id_kategori = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Kategori;
