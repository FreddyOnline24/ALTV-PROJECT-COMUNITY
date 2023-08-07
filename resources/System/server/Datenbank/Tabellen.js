import alt from 'alt-server';
import { db } from '../Datenbank/Verbindung.js';


export function createPlayerStats() {
  db.query(
    `CREATE TABLE IF NOT EXISTS playerstats (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      cash INT(6),
      bankmoney INT(6),
      hunger INT(6),
      thirst INT(6),
      health INT(6),
      armor INT(6)
    )`,
    function (err, result) {
      if (err) throw err;
      console.log('[ServerSystem] Table "playerstats" was created.');
    }
  );
}

export function createPlayerInfos() {
    db.query(
      `CREATE TABLE IF NOT EXISTS playerinfos (
      id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      permissionlevel INT(6) NOT NULL
      )`,
      function (err, result) {
        if (err) throw err;
        console.log('[ServerSystem] Table "playerinfos" was created.');
      }
    );
  }
  
  export function createLastLocationTable() {
      db.query(
          `CREATE TABLE IF NOT EXISTS lastlocation (
          id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(30) NOT NULL,
          x FLOAT(10),
          y FLOAT(10),
          z FLOAT(10)
          )`,
          function (err, result) {
          if (err) throw err;
          console.log('[ServerSystem] Table "lastlocation" was created.');
          }
      );
 }

 
  
export function createAccountsTable() {
    db.query(
      `CREATE TABLE IF NOT EXISTS accounts (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(50),
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      function (err, result) {
        if (err) throw err;
        console.log('[ServerSystem] Table "accounts" was created.');
      }
    );
  }


export function createBanTable() {
    db.query(
      `CREATE TABLE IF NOT EXISTS ban (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        reason VARCHAR(255) NOT NULL,
        admin VARCHAR(30) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      function (err, result) {
        if (err) throw err;
        console.log('[ServerSystem] Table "ban" was created.');
      }
    );
  }

export function createPlayerVehicles() {
    db.query(
      `CREATE TABLE IF NOT EXISTS playervehicles (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        model VARCHAR(30) NOT NULL,
        x FLOAT(10),
        y FLOAT(10),
        z FLOAT(10)
      )`,
      function (err, result) {
        if (err) throw err;
        console.log('[ServerSystem] Table "playervehicles" was created.');
      }
    );
}

export function createPlayerInventory() {
    db.query(
      `CREATE TABLE IF NOT EXISTS playerinventory (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        item VARCHAR(30) NOT NULL,
        amount INT(6) NOT NULL
      )`,
      function (err, result) {
        if (err) throw err;
        console.log('[ServerSystem] Table "playerinventory" was created.');
      }
    );
}