import alt from 'alt-client';

alt.onServer('teleportToMarker', tpToWaypoint)

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

let res = false
let finalZ

async function tpToWaypoint() {

    res = false
    const waypoint = native.getFirstBlipInfoId(8)

    if (native.doesBlipExist(waypoint)) {

        const coords = native.getBlipInfoIdCoord(waypoint)
        let getZ = coords.z

        while (!res || getZ > 1000) {
            getZ = getZ + 20
            const finalCoords = new alt.Vector3(coords.x, coords.y, getZ)
            result(finalCoords)
            await delay(1)
        }

        if (res) {
            alt.emitServer('teleportToMarker', finalZ)
        }

        alt.FocusData.clearFocus()
    }
}

function result(coords) {

    alt.FocusData.overrideFocus(coords)
    const result = native.getGroundZFor3dCoord(coords.x, coords.y,   coords.z, undefined, undefined, undefined)

    if (result[0]) {
        res = true
        finalZ = new alt.Vector3(coords.x, coords.y, result[1] + 1)
    }
}