import alt from 'alt-server';
import * as chat from 'alt:chat';
import { db } from '../Datenbank/Verbindung.js';

alt.onClient("noclip:setPos", (player, x, y, z) => {
    player.pos = new alt.Vector3(x, y, z);
});

