import alt from 'alt-server';


alt.onClient("AdministrationMenu:Adminkleidung", (player) => {
    player.setClothes(4, 24, 5, 0);   // Pants
    player.setClothes(6, 26, 2, 0);    // Shoes
    player.setClothes(1, 54, 1, 0);   // Mask
    player.setClothes(2, 0, 0, 0);     // Hair Style
    player.setClothes(5, 0, 0, 0);     // Bags
    player.setClothes(7, 0, 0, 0);    // Accessories
    player.setClothes(8, 15, 0, 0);     // Undershirts
    player.setClothes(9, 58, 2, 0);     // Body Armour
    player.setClothes(10, 0, 0, 0);    // Decals
    player.setClothes(11, 332, 6, 0);   // Top
});


alt.onClient("AdministrationMenu:Developerkleidung", (player) => {
  player.setClothes(4, 24, 5, 0);   // Pants
  player.setClothes(6, 26, 2, 0);    // Shoes
  player.setClothes(1, 54, 1, 0);   // Mask
  player.setClothes(2, 0, 0, 0);     // Hair Style
  player.setClothes(5, 0, 0, 0);     // Bags
  player.setClothes(7, 0, 0, 0);    // Accessories
  player.setClothes(8, 15, 0, 0);     // Undershirts
  player.setClothes(9, 58, 1, 0);     // Body Armour
  player.setClothes(10, 0, 0, 0);    // Decals
  player.setClothes(11, 332, 6, 0);   // Top
});



alt.onClient("AdministrationMenu:Supporterkleidung", (player) => {
  player.setClothes(4, 24, 5, 0);   // Pants
  player.setClothes(6, 26, 2, 0);    // Shoes
  player.setClothes(1, 54, 1, 0);   // Mask
  player.setClothes(2, 0, 0, 0);     // Hair Style
  player.setClothes(5, 0, 0, 0);     // Bags
  player.setClothes(7, 0, 0, 0);    // Accessories
  player.setClothes(8, 15, 0, 0);     // Undershirts
  player.setClothes(9, 58, 0, 0);     // Body Armour
  player.setClothes(10, 0, 0, 0);    // Decals
  player.setClothes(11, 332, 6, 0);   // Top
});


alt.onClient('admin:revive', (player, targetPlayerName) => {
    const targetPlayer = alt.Player.all.find((p) => p.name === targetPlayerName);
    if (targetPlayer) {
        targetPlayer.spawn(targetPlayer.pos.x, targetPlayer.pos.y, targetPlayer.pos.z, 0);
    }
});

alt.onClient('admin:heal', (player, targetPlayerName) => {
    const targetPlayer = alt.Player.all.find((p) => p.name === targetPlayerName);
    if (targetPlayer) {
        targetPlayer.health = 100;
    }
});


alt.onClient('admin:getPlayerWeapons', (player, targetPlayerName) => {
    const targetPlayer = alt.Player.all.find((p) => p.name === targetPlayerName);
    if (targetPlayer) {
      const playerWeapons = targetPlayer.weapons;
      const weaponList = [];
      for (const weapon of playerWeapons) {
        weaponList.push(weapon.name);
      }
      alt.emitClient(player, 'admin:showPlayerWeapons', targetPlayerName, weaponList);
    }
  });
  
  alt.onClient('admin:weapons', (player, targetPlayerName, weaponName) => {
    const targetPlayer = alt.Player.all.find((p) => p.name === targetPlayerName);
    if (targetPlayer) {
      targetPlayer.giveWeapon(weaponName, 100, true);
    }
  });
  
  alt.onClient('admin:weaponsRemove', (player, targetPlayerName, weaponName) => {
    const targetPlayer = alt.Player.all.find((p) => p.name === targetPlayerName);
    if (targetPlayer) {
      const playerWeapons = targetPlayer.weapons;
      for (const weapon of playerWeapons) {
        if (weapon.name === weaponName) {
          targetPlayer.removeWeapon(weaponName);
          alt.emitClient(player, 'admin:weaponRemoved', targetPlayerName, weaponName);
          break;
        }
      }
    }
  });