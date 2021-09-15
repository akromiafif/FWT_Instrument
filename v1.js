/*************
Initialization
**************/

//Requiring module
let mavlinkv1module = require("mavlink");

//MAVLink object
let mavLinkv1receive = new mavlinkv1module(0, 0, "v1.0", ["common"]);
let mavLinkv1send = new mavlinkv1module(1, 255, "v1.0", ["common"]);
exports.mavLinkv1receive = mavLinkv1receive;
exports.mavLinkv1send = mavLinkv1send;

let att = {
  time_boot_ms: 0,
  pitch: 0,
  roll: 0,
  yaw: 0,
  airspeed: 0,
  groundspeed: 0,
  heading: 0,
  alt: 0,
  vy: 0,
};

//Nunggu sampe module mavlink ready
mavLinkv1receive.on("ready", function () {
  mavLinkv1send.on("ready", function () {
    var mavLinkv1ready = true;
    exports.mavLinkv1ready = mavLinkv1ready;

    mavLinkv1receive.on("ATTITUDE", function (message, fields) {
      att.time_boot_ms = fields.time_boot_ms;
      att.pitch = fields.pitch;
      att.roll = fields.roll;
      att.yaw = fields.yaw;
    });

    mavLinkv1receive.on("VFR_HUD", function (message, fields) {
      att.airspeed = fields.airspeed;
      att.groundspeed = fields.groundspeed;
      // att.alt = fields.alt;
      att.heading = fields.heading;
    });

    mavLinkv1receive.on("GLOBAL_POSITION_INT", function (message, fields) {
      att.vy = fields.vy / 100;
      att.alt = fields.relative_alt / 1000;
    });
  });
});

//Fungsi parser v1
function v1parse(data) {
  mavLinkv1receive.parse(data);
}
exports.v1parse = v1parse;
exports.att = att;
