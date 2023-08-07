
import alt from 'alt-server';
import * as chat from 'alt:chat';
import { db } from '../Datenbank/Verbindung.js';


chat.registerCmd('getcords', (player) => {
    chat.send(player, `X: ${player.pos.x} Y: ${player.pos.y} Z: ${player.pos.z}`, 255, 255, 255);
});
