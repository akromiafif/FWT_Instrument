let serialportmodule = require("serialport");
let serialport = new serialportmodule("COM10", { baudRate: 115200 });
let v1 = require("./v1.js");

/* ONCLICK BUTTON BUAT STARTMAVLINK */
// const startBtn = document.getElementById("startMav");
// startBtn.addEventListener("click", function (event) {
//   // GET_COORDINATE();
//   START_MAVLINK();
// });

START_MAVLINK();

/* ONCLICK BUTTON BUAT STARTMAVLINK */

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

      setInterval(() => {
        console.log(v1.att);
      }, 1000);
    } else {
      console.log("Failed to start");
    }
  }, 3000);
}
/*  --------------------------------- START MAVLINK --------------------------------- */
