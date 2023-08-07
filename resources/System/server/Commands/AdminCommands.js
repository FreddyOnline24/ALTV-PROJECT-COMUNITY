import alt from 'alt-server';
import * as chat from 'alt:chat';
import { db } from '../Datenbank/Verbindung.js';
import { checkadmin } from '../Datenbank/Exports.js';




chat.registerCmd('ban', async (player, args) => {
    try {
     const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      }
        if(args == null) {
            chat.send(player, `Du musst einen Spieler angeben`, 255, 255, 255);
            } else {
                const target = alt.Player.all.find(x => x.name === args[0]);
                if(target == null) {
                    chat.send(player, `Dieser Spieler ist nicht Online`, 255, 255, 255);
                    } else {
                        if(args[1] == null) {
                            chat.send(player, `Du musst einen Grund angeben`, 255, 255, 255);
                            } else {
                                const reason = args.slice(1).join(' ');
                                db.query(
                                    `INSERT INTO ban (name, reason) VALUES (?, ?)`,
                                    [target.name, reason],
                                    function (err, result) {
                                      if (err) throw err;
                                      chat.send(player, `Du hast ${target.name} gebannt`, 255, 255, 255);
                                      chat.send(target, `Du wurdest von ${player.name} gebannt`, 255, 255, 255);
                                      target.kick(reason);
                                    }
                                    );
                            }
                        }
                    }
    } catch (err) {
        console.log(err);
    }
});


chat.registerCmd('kick', async (player, args) => {
    try {
        const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      }
        if(args == null) {
            chat.send(player, `Du musst einen Spieler angeben`, 255, 255, 255);
            } else {
                const target = alt.Player.all.find(x => x.name === args[0]);
                if(target == null) {
                    chat.send(player, `Dieser Spieler ist nicht Online`, 255, 255, 255);
                    } else {
                        if(args[1] == null) {
                            chat.send(player, `Du musst einen Grund angeben`, 255, 255, 255);
                            } else {
                                const reason = args.slice(1).join(' ');
                                chat.send(player, `Du hast ${target.name} gekickt`, 255, 255, 255);
                                chat.send(target, `Du wurdest von ${player.name} gekickt`, 255, 255, 255);
                                target.kick(reason);
                            }
                        }
                    }
    } catch (err) {
        console.log(err);
    }
});


chat.registerCmd('unban', async (player, args) => {
    try {
        const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      }
        if(args == null) {
            chat.send(player, `Du musst einen Spieler angeben`, 255, 255, 255);
            } else {
                const target = alt.Player.all.find(x => x.name === args[0]);
                if(target == null) {
                    chat.send(player, `Dieser Spieler ist nicht Online`, 255, 255, 255);
                    } else {
                        db.query(
                            `DELETE FROM ban WHERE name = ?`,
                            [target.name],
                            function (err, result) {
                              if (err) throw err;
                              chat.send(player, `Du hast ${target.name} entbannt`, 255, 255, 255);
                              chat.send(target, `Du wurdest von ${player.name} entbannt`, 255, 255, 255);
                            }
                            );
                        }
                    }
    } catch (err) {
        console.log(err);
    }
});


chat.registerCmd('getbans', async (player) => {
    try {
        const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      }
        db.query(
            `SELECT * FROM ban`,
            function (err, result) {
              if (err) throw err;
              chat.send(player, `Es sind ${result.length} Spieler gebannt`, 255, 255, 255);
              for(let i = 0; i < result.length; i++) {
                  chat.send(player, `${result[i].name} - ${result[i].reason}`, 255, 255, 255);
              }
            }
            );
    } catch (err) {
        console.log(err);
    }
});


chat.registerCmd('car', async (player, args) => {
    try {
        const isAdmin = await checkadmin(player);
        if (!isAdmin) {
          return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
        }
        if(args == null) {
            chat.send(player, `Du musst ein Fahrzeug angeben was auch in Altv vorhanden ist`, 255, 255, 255);
        } else {
            const veh = new alt.Vehicle(args[0], player.pos.x, player.pos.y + 8, player.pos.z, 0, 0, 0);
            veh.numberPlate = "Awanta-V";
            veh.numberPlateText = "Awanta-V";
            veh.numberPlateIndex = 1;
            veh.engineOn = true;
            chat.send(player, `Du hast dir ein Fahrzeug gespawnt`, 255, 255, 255);
        }
    } catch (err) {
        console.log(err);
    }
});

chat.registerCmd("dv", async (player, args) => {
    const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      }
    if (args.length === 0) {
        if (player.vehicle) {
            player.vehicle.destroy();
            chat.send(player, `Du hast das Fahrzeug, in dem du bist, zerstört!`, 255, 255, 255);
        } else {
            chat.send(player, `Du bist in keinem Fahrzeug!`, 255, 255, 255);
        }
    } else if (args.length === 1) {
        const arg = parseInt(args[0]);
        if (!isNaN(arg)) {
            if (arg < 1) {
                if (player.vehicle) {
                    player.vehicle.destroy();
                    chat.send(player, `Du hast das Fahrzeug, in dem du bist, zerstört!`, 255, 255, 255);
                } else {
                    chat.send(player, `Du bist in keinem Fahrzeug!`, 255, 255, 255);
                }
            } else {
                const range = arg;
                const vehicles = alt.Vehicle.all;
                const pos = player.pos;
                let destroyedCount = 0;

                vehicles.forEach((vehicle) => {
                    const dist = vehicle.pos.sub(pos).length;
                    if (dist <= range) {
                        vehicle.destroy();
                        destroyedCount++;
                    }
                });

                if (destroyedCount > 0) {
                    chat.send(player, `Du hast ${destroyedCount} Fahrzeug(e) in deiner Nähe zerstört!`, 255, 255, 255);
                } else {
                    chat.send(player, `Es wurden keine Fahrzeuge in deiner Nähe gefunden!`, 255, 255, 255);
                }
            }
        } else {
            chat.send(player, `Ungültiger Argumentwert. Bitte gib eine Zahl für die Range ein.`, 255, 255, 255);
        }
    } else {
        chat.send(player, `Falsche Verwendung des Befehls. Entweder /dv oder /dv (range).`, 255, 255, 255);
    }
});

chat.registerCmd('tp', async (player, args) => {
    const isAdmin = await checkadmin(player);
    if (!isAdmin) {
      return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
    }
        const x = parseFloat(args[0]);
        const y = parseFloat(args[1]);
        const z = parseFloat(args[2]);
    
        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            chat.send(player, `Ungültige Koordinaten. Bitte verwende Zahlen.`);
            return;
        }
    
        const currentVehicle = player.vehicle;
    
        player.pos = new alt.Vector3(x, y, z);
    
        if (currentVehicle) {
            player.vehicle = currentVehicle;
            currentVehicle.pos = new alt.Vector3(x, y, z);
            currentVehicle.rotation = new alt.Vector3(0, 0, 0);
        }
});

chat.registerCmd('revive', async (player, args) => {
    const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      }
    if(args.length === 0) {
        player.spawn(player.pos.x, player.pos.y, player.pos.z, 0);
        player.health = 100;
        chat.send(player, `Du wurdest wiederbelebt!`, 255, 255, 255);
    } else if(args.length === 1) {
        const target = alt.Player.all.find((x) => x.id.toString() === args[0] || x.name === args[0]);
        if(target) {
            target.spawn(target.pos.x, target.pos.y, target.pos.z, 0);
            target.health = 100;
            chat.send(player, `Du hast ${target.name} wiederbelebt!`, 255, 255, 255);
            chat.send(target, `Du wurdest von ${player.name} wiederbelebt!`, 255, 255, 255);
        } else {
            chat.send(player, `Der Spieler wurde nicht gefunden!`, 255, 255, 255);
        }
    }
});


chat.registerCmd('noclip_an', async (player) => {
    const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      }
    alt.emitClient(player, 'noclip:start');
});

chat.registerCmd('noclip_aus', async (player) => {
    const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      }
    alt.emitClient(player, 'noclip:stop');
});


alt.onClient('teleportToMarker', (player, coords) => {
    player.pos = coords
})


chat.registerCmd("tpm", async (player) => {
    const isAdmin = await checkadmin(player);
      if (!isAdmin) {
        return chat.send(player, 'Du hast nicht die benötigten Rechte!', 255, 255, 255);
      } else {
        alt.emitClient(player, "teleportToMarker")
      }
});