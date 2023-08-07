import alt from 'alt-server';
import { savelastlocationintodatebase } from '../Datenbank/Exports.js';
import { loadPlayerStats } from '../Datenbank/Exports.js';
import { db } from '../Datenbank/Verbindung.js';
import * as chat from 'alt:chat';
alt.on('nametags:Config', handleConfig);

/**
 * @param  {alt.Player} player
 * @param  {Boolean} showNametags Draw nametags for all players for player?
 * @param  {Boolean} hideNamesInVehicles=false
 * @param  {Boolean} showBarsOnAim=false
 * @param  {Number} maxDrawDistance=100
 */
function handleConfig(
  player,
  showNametags = true,
  hideNamesInVehicles = false,
  showBarsOnAim = false,
  maxDrawDistance = 25
) {
  alt.emitClient(player, 'nametags:Config', showNametags, hideNamesInVehicles, showBarsOnAim, maxDrawDistance);
}

alt.on('playerConnect', (player) => {
  db.query(
    `SELECT * FROM ban WHERE name = ? LIMIT 1`,
    [player.name],
    function (err, rows) {
      if (err) throw err;

      if (rows.length > 0) {
        player.kick('Du bist gebannt!, Melde dich im Support!');
      }
    }
  );
  alt.emitClient(player, 'auth:Open');
  alt.emitClient(player, 'connectionComplete');
  db.query(`SELECT * FROM lastlocation WHERE name = '${player.name}'`, function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
       player.spawn(result[0].x, result[0].y, result[0].z, 0);
       player.model = "mp_m_freemode_01";
       chat.send(player, "Willkommen zurück " + player.name);
       alt.emitClient(player, 'Speedometer:Toggle');
      } else {
        player.spawn(4840.571, -5174.425, 2.0, 0);
        player.model = "mp_m_freemode_01";
        console.log(player.name + " hat sich eingeloggt");
        alt.emitClient(player, 'Speedometer:Toggle');
        const playerlastlocationQuery = `INSERT INTO lastlocation (name, x, y, z) VALUES (?, ?, ?, ?)`;
       const playerlastlocationValues = [player.name, '4840.571', '-5174.425', '2.0'];
       db.query(playerlastlocationQuery, playerlastlocationValues, function (err, result) {
       if (err) {
          console.error(err);
       } else {
          console.log('Daten in playerlastlocation eingefügt!');
       }
       });
    }
 });
});

alt.setInterval(function () {
  alt.Player.all.forEach(player => {
     const updateQuery = `UPDATE lastlocation SET x = ?, y = ?, z = ? WHERE name = ?`;
     const updateValues = [player.pos.x, player.pos.y, player.pos.z, player.name];
     
     db.query(updateQuery, updateValues, function (err, result) {
       if (err) {
         console.error(err);
       } else {
       }
     });
  });
}, 1000);



