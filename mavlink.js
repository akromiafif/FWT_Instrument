let serialportmodule = require("serialport");
let serialport = new serialportmodule("COM6", { baudRate: 57600 });
let v1 = require("./v1.js");
const anime = require("animejs");

/* ONCLICK BUTTON BUAT STARTMAVLINK */
// const startBtn = document.getElementById("startMav");
// startBtn.addEventListener("click", function (event) {
//   // GET_COORDINATE();
//   START_MAVLINK();
// });

START_MAVLINK();

function startAnimation() {
  anime({
    targets: "#arrow-compass",
    // rotate: (v1.att.yaw * 180) / Math.PI + 110,
    rotate: v1.att.heading,
    duration: 0,
    easing: "linear",
    round: 1,
  });

  anime({
    targets: ".sky",
    rotate: Math.round(((v1.att.roll * 180) / Math.PI) * -1),
    translateY: Math.round((v1.att.pitch * 180) / Math.PI),
    duration: 0,
    easing: "linear",
  });

  anime({
    targets: "#alt-text",
    innerHTML: Math.abs(v1.att.alt),
    duration: 0,
    round: 1,
  });

  anime({
    targets: "#altitude-arrow",
    rotate: Math.round(Math.abs(v1.att.alt / 0.1111111)),
    duration: 0,
    easing: "linear",
    round: 1,
  });

  anime({
    targets: "#airspeed-arrow",
    rotate: Math.round(Math.abs(v1.att.airspeed / 0.1111111)),
    duration: 0,
    easing: "linear",
    round: 1,
  });

  anime({
    targets: "#vertical-arrow",
    rotate: Math.round(Math.abs(v1.att.vy / 0.13888889)),
    duration: 0,
    easing: "linear",
    round: 1,
  });

  requestAnimationFrame(startAnimation);
}

startAnimation();

/*  --------------------------------- START MAVLINK --------------------------------- */
function START_MAVLINK() {
  console.log("Initializing MAVLink...");

  setTimeout(() => {
    if (v1.mavLinkv1ready) {
      console.log("MAVLink V1 ready...");

      v1.mavLinkv1receive.on("COMMAND_LONG", function (bytes) {
        serialport.write(bytes);
      });

      serialport.on("data", function (data) {
        v1.v1parse(data);
      });

      startAnimation();
    } else {
      console.log("Failed to start");
    }
  }, 3000);
}
/*  --------------------------------- START MAVLINK --------------------------------- */
