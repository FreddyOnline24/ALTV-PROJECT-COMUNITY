import alt from 'alt-server';
import { MSGS } from './messages.js';
import mysql from 'mysql';
import { db } from '../Datenbank/Verbindung.js';
import { savelastlocationintodatebase } from '../Datenbank/Exports.js';
import { state } from '../Datenbank/Exports.js';

function handleAuthAttempt(player, username, password, email) {
  if (email) {
    handleRegistration(player, email, username, password);
  } else {
    handleLogin(player, username, password);
  }
}

function handleRegistration(player, email, username, password) {
  db.query(
    `SELECT * FROM accounts WHERE username = ? LIMIT 1`,
    [username],
    function (err, rows) {
      if (err) throw err;

      if (rows.length > 0) {
        alt.emitClient(player, 'auth:Error', MSGS.USERNAME_TAKEN);
      } else {
        db.query(
          `SELECT * FROM accounts WHERE email = ? LIMIT 1`,
          [email],
          function (err, rows) {
            if (err) throw err;

            if (rows.length > 0) {
              alt.emitClient(player, 'auth:Error', MSGS.EMAIL_TAKEN);
            } else {
              db.query(
                `INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)`,
                [username, password, email],
                function (err, result) {
                  if (err) throw err;

                  if (result.affectedRows > 0) {
                    alt.emitClient(player, 'auth:Done', result.insertId, username, email);
                    alt.emitClient(player, 'auth:Exit');
                    alt.emitClient(player, 'auth:Open');
                    player.spawn(4840.571, -5174.425, 2.0, 0);
                    savelastlocationintodatebase(player);
                    state.isSpawned = true;
                    db.query(
                      `INSERT INTO playerinfos (name, permissionlevel) VALUES (?, ?)`,
                      [player.name, 0],
                      function (err, result) {
                        if (err) throw err;
                      }
                    );
                  } else {
                    alt.emitClient(player, 'auth:Error', MSGS.UNKNOWN);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
}


function handleLogin(player, username, password) {
  db.query(
    `SELECT * FROM accounts WHERE username = ? LIMIT 1`,
    [username],
    function (err, rows) {
      if (err) throw err;

      if (rows.length <= 0) {
        alt.emitClient(player, 'auth:Error', MSGS.USERNAME_NOT_FOUND);
      } else {
        if (rows[0].password !== password) {
          alt.emitClient(player, 'auth:Error', MSGS.PASSWORD_INCORRECT);
        } else {
          alt.emitClient(player, 'auth:Done', rows[0].id, username, rows[0].email);
            alt.emitClient(player, 'auth:Exit');
            db.query(
                `SELECT * FROM lastlocation WHERE name = ? LIMIT 1`,
                [player.name],
                function (err, rows) {
                  if (err) throw err;
          
                  if (rows.length <= 0) {
                     player.spawn(4840.571, -5174.425, 2.0, 0);
                     savelastlocationintodatebase(player);
                     player.model = 'mp_m_freemode_01';
                     state.isSpawned = true;
                  } else {
                    if (rows[0].name == player.name) {
                      player.model = 'mp_m_freemode_01';
                      player.spawn(rows[0].x, rows[0].y, rows[0].z, 0);
                      state.isSpawned = true;
                    } else {
                      alt.emitClient(player, 'auth:Error', MSGS.PASSWORD_INCORRECT);
                    }
                  }
                }
              );
        }
      }
    }
  );
}

alt.onClient('auth:Try', handleAuthAttempt);
