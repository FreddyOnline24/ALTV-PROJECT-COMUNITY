import alt from 'alt-server';
import mysql from 'mysql';
import * as tables from './Tabellen.js';


export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'altv-server',
});


db.connect(function (err) {
    if (err) throw err;
    console.log('[ServerSystem] Connected to the database.');
    tables.createAccountsTable();
    tables.createLastLocationTable();
    tables.createPlayerInfos();
    tables.createBanTable();
    tables.createPlayerVehicles();
    tables.createPlayerInventory();
    tables.createPlayerStats();
});
  