const socket = io();
socket.on('msg', data => {
  console.log(data);
  meh.innerHTML = `Socket ID: ${data.id}`;
});

socket.on('ready', () => {
  console.log('THIS ROOM IS READY');
});

socket.on('drop_partner', () => {
  console.log('PARTNER WAS DROPPED');
});
