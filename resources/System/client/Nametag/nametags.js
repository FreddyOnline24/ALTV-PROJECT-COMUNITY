import * as alt from 'alt-client';
import * as native from 'natives';

alt.everyTick(() => {
  showmyidoverhead()
  showmyVoice()
});

function showmyVoice() {
  drawText3d(
      `Voice: ${alt.Player.local.getSyncedMeta("voice")}`,
      alt.Player.local.pos.x,
      alt.Player.local.pos.y,
      alt.Player.local.pos.z + 1.1,
      0.4,
      4,
      255,
      255,
      255,
      255,
      true,
      true,
      0
  );
}


function showmyidoverhead() {
  drawText3d(
      `ID: ${alt.Player.local.scriptID}`,
      alt.Player.local.pos.x,
      alt.Player.local.pos.y,
      alt.Player.local.pos.z + 1.2,
      0.4,
      4,
      255,
      255,
      255,
      255,
      true,
      true,
      0
  );
}


function drawText3d(
  msg,
  x,
  y,
  z,
  scale,
  fontType,
  r,
  g,
  b,
  a,
  useOutline = true,
  useDropShadow = true,
  layer = 0
) {
  let hex = msg.match(/{.*}/);
  if (hex) {
      const rgb = hexToRgb(hex[0].replace("{", "").replace("}", ""));
      r = rgb[0];
      g = rgb[1];
      b = rgb[2];
      msg = msg.replace(hex[0], "");
  }

  native.setDrawOrigin(x, y, z, 0);
  native.beginTextCommandDisplayText("STRING");
  native.addTextComponentSubstringPlayerName(msg);
  native.setTextFont(fontType);
  native.setTextScale(1, scale);
  native.setTextWrap(0.0, 1.0);
  native.setTextCentre(true);
  native.setTextColour(r, g, b, a);

  if (useOutline) {
      native.setTextOutline();
  }

  if (useDropShadow) {
      native.setTextDropShadow();
  }

  native.endTextCommandDisplayText(0, 0, 0);
  native.clearDrawOrigin();
}
