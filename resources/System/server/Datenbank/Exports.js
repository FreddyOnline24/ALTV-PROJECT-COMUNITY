import alt from 'alt-server';
import { db } from '../Datenbank/Verbindung.js';


export const state = {
  isSpawned: false,
};

export function setAdminPermissionLevel(player, permissionLevel) {
    db.query(
      `UPDATE playerinfos SET permissionlevel = ? WHERE name = ?`,
      [permissionLevel, player.name],
      function (err, result) {
        if (err) throw err;
        console.log(`[ServerSystem] ${player.name} is now admin.`);
      }
    );
  }
  
  export function getAdminPermissionLevel(player) {
    db.query(
      `SELECT * FROM playerinfos WHERE name = ? LIMIT 1`,
      [player.name],
      function (err, rows) {
        if (err) throw err;
  
        if (rows.length > 0) {
          return rows[0].permissionlevel;
        } else {
          return 0;
        }
      }
    );
  }

  export function checkadmin(player) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM playerinfos WHERE name = ?', [player.name], function (err, result) {
        if (err) {
          reject(err);
        } else {
          if (result.length > 0) {
            const permission = result[0].permissionlevel;
            resolve(permission === 100);
          } else {
            resolve(false);
          }
        }
      });
    });
  }

  
  export function setBan(player, reason) {
    db.query(
      `INSERT INTO ban (name, reason) VALUES (?, ?)`,
      [player.name, reason],
      function (err, result) {
        if (err) throw err;
        console.log(`[ServerSystem] ${player.name} was banned.`);
      }
    );
  }

  export function isBanned(player) {
    db.query(
      `SELECT * FROM ban WHERE name = ? LIMIT 1`,
      [player.name],
      function (err, rows) {
        if (err) throw err;
  
        if (rows.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    );
  }

  export function getBanReason(player) {
    db.query(
      `SELECT * FROM ban WHERE name = ? LIMIT 1`,
      [player.name],
      function (err, rows) {
        if (err) throw err;
  
        if (rows.length > 0) {
          return rows[0].reason;
        } else {
          return '';
        }
      }
    );
  }

  export function removeBan(player) {
    db.query(
      `DELETE FROM ban WHERE name = ?`,
      [player.name],
      function (err, result) {
        if (err) throw err;
        console.log(`[ServerSystem] ${player.name} was unbanned.`);
      }
    );
  }

  export function setPlayerInfo(player, key, value) {
    db.query(
      `UPDATE playerinfos SET ${key} = ? WHERE name = ?`,
      [value, player.name],
      function (err, result) {
        if (err) throw err;
        console.log(`[ServerSystem] ${player.name} was updated.`);
      }
    );
  }

  export function getPlayerInfo(player, key) {
    db.query(
      `SELECT * FROM playerinfos WHERE name = ? LIMIT 1`,
      [player.name],
      function (err, rows) {
        if (err) throw err;
  
        if (rows.length > 0) {
          return rows[0][key];
        } else {
          return '';
        }
      }
    );
  }


  export function getplayervehicles(player) {
    db.query(
      `SELECT * FROM vehicles WHERE name = ?`,
      [player.name],
      function (err, rows) {
        if (err) throw err;
  
        if (rows.length > 0) {
          return rows;
        } else {
          return '';
        }
      }
    );
  }

  export function getplayerInventory(player) {
    db.query(
      `SELECT * FROM inventory WHERE name = ?`,
      [player.name],
      function (err, rows) {
        if (err) throw err;
  
        if (rows.length > 0) {
          return rows;
        } else {
          return '';
        }
      }
    );
  }

  export function savelastlocationintodatebase() {
    const player = alt.Player.local;
    if (!state.isSpawned) {
      console.log("Player not spawned.");
      return;
    }
  
    if (!player || !player.name) {
      console.log("No player found or player name is missing.");
      return;
    }
  
    db.query(
      `SELECT * FROM playerinfos WHERE name = ? LIMIT 1`,
      [player.name],
      function (err, rows) {
        if (err) {
          console.log("Error while querying the database:", err);
          throw err;
        }
  
        if (rows.length > 0) {
          db.query(
            `UPDATE playerinfos SET x = ?, y = ?, z = ? WHERE name = ?`,
            [player.pos.x, player.pos.y, player.pos.z, player.name],
            function (err, result) {
              if (err) {
                console.log("Error while updating player info:", err);
                throw err;
              }
              console.log(`[ServerSystem] ${player.name} was updated.`);
            }
          );
        } else {
          db.query(
            `INSERT INTO playerinfos (name, x, y, z) VALUES (?, ?, ?, ?)`,
            [player.name, player.pos.x, player.pos.y, player.pos.z],
            function (err, result) {
              if (err) {
                console.log("Error while inserting player info:", err);
                throw err;
              }
              console.log(`[ServerSystem] ${player.name} was created.`);
            }
          );
        }
      }
    );
  }


  export function loadPlayerStats() {
    db.query(
      `SELECT * FROM playerstats WHERE name = ? LIMIT 1`,
      [player.name],
      function (err, rows) {
        if (err) throw err;
  
        if (rows.length > 0) {
          const cash = rows[0].cash;
          const bankmoney = rows[0].bankmoney;
          const hunger = rows[0].hunger;
          const thirst = rows[0].thirst;
          const health = rows[0].health;
          const armor = rows[0].armor;
          return [cash, bankmoney, hunger, thirst, health, armor];
        } else {
          setDefaultPlayerStats();
          return [100, 0, 100, 100, 100, 100];
        }
      }
    );
  }
