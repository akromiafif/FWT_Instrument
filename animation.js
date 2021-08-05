// setInterval(() => {
//   anime({
//     targets: '#airspeed-arrow',
//     rotateZ: 180
//   });
//   console.log('Hello');
// }, 1000);

setInterval(() => {
  anime({
    targets: "#alt-text",
    innerHTML: Math.floor(Math.random() * 100),
    round: 1,
  });
}, 1000);
