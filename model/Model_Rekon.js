const connection = require("../config/database");

class Model_Rekon {
  // Mengambil semua data
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM rekon ORDER BY id_rekon DESC",
        (err, rows) => {
          if (err) {
            console.error("Database query error in getAll:", err); // Tambahkan logging
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  // Menyimpan data
  static async store(Data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO rekon SET ?", Data, (err, result) => {
        if (err) {
          console.error("Database query error in store:", err); // Tambahkan logging
          reject(err);
        } else {
          console.log("Data inserted successfully:", result); // Tambahkan logging
          resolve(result);
        }
      });
    });
  }

  // Mengambil data berdasarkan ID
  static async getId(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM rekon WHERE id_rekon = ?",
        [id],
        (err, rows) => {
          if (err) {
            console.error("Database query error in getId:", err); // Tambahkan logging
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

   // Mengupdate data level_acc
   static async updateLevelAcc(id, level_acc) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE rekon SET level_acc = ? WHERE id_rekon = ?",
        [level_acc, id],
        (err, result) => {
          if (err) {
            console.error("Database query error in updateLevelAcc:", err); // Tambahkan logging
            reject(err);
          } else {
            console.log("Level_acc updated successfully:", result); // Tambahkan logging
            resolve(result);
          }
        }
      );
    });
  }

  // Mengupdate data
  static async update(id, Data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE rekon SET ? WHERE id_rekon = ?",
        [Data, id],
        (err, result) => {
          if (err) {
            console.error("Database query error in update:", err); // Tambahkan logging
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  // Menghapus data
  static async delete(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM rekon WHERE id_rekon = ?",
        [id],
        (err, result) => {
          if (err) {
            console.error("Database query error in delete:", err); // Tambahkan logging
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

module.exports = Model_Rekon;
