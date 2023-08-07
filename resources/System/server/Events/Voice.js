import * as alt from 'alt-server';
import * as chat from 'alt:chat';

let mainChannel = new alt.VoiceChannel(true, 25);

export function addToGlobalVoice(player) {
    if (mainChannel.isPlayerInChannel(player)) {
        return;
    }

    mainChannel.addPlayer(player);
}

export function removeFromGlobalVoice(player) {
    if (!mainChannel.isPlayerInChannel(player)) {
        return;
    }

    mainChannel.removePlayer(player);
}

alt.on('playerConnect', (player) => {
    player.setSyncedMeta('voice', true);
    addToGlobalVoice(player);
});

alt.on('playerDisconnect', (player) => {
    removeFromGlobalVoice(player);
    player.setSyncedMeta('voice', false);
});

chat.registerCmd('voice', (player) => {
    if (player.getSyncedMeta('voice') === 'true') {
        player.setSyncedMeta('voice', 'false');
        removeFromGlobalVoice(player);
        chat.send(player, "Du hast deine Stimme ausgeschaltet!");
    } else {
        player.setSyncedMeta('voice', 'true');
        addToGlobalVoice(player);
        chat.send(player, "Du hast deine Stimme eingeschaltet!");
    }
});