import alt from 'alt-client';
import { drawText2d } from './DrawText.js';

let speedometer1 = null;
let speedometerVisible = false;

alt.onServer('Speedometer:Toggle', toggleSpeedometer);

function toggleSpeedometer() {
    if (speedometerVisible) {
        speedometerVisible = false;
        alt.clearInterval(speedometer1);
        return;
    }

    speedometerVisible = true;
    speedometer1 = alt.setInterval(drawSpeedometer, 0);
}


function drawSpeedometer() {
    // Überprüfe, ob der Spieler ein Fahrzeug besitzt
    if (alt.Player.local.vehicle === null) {
        drawText2d('', 0.02, 0.84, 0.4, 0, 255, 255, 255, 255, true, true);
        return;
    }

    const speed = alt.Player.local.vehicle.speed;

    // Konvertiere die Geschwindigkeit und den Tankinhalt in einen lesbaren String
    const speedConverted = (speed * 3.6).toFixed(0);

    drawText2d(`~b~${speedConverted} km/h`, 0.08, 0.75, 0.6, 0, 0, 255, 0, 255, true, true);    
}

