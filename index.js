const express = require('express');
const _ = require('lodash');
const uuid = require('uuid/v4');
const c = require('chalk');
const Game = require('./game');
const app = express();

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log('🚀  Server running on Port:', port)
);

// app.use(express.static('client/build/'));

const io = require('socket.io')(server);
const game = new Game(io);

io.sockets.on('connection', socket => {
  console.log(`Client (id: ${socket.id}) connected.`);
  const open = game.getOpenRooms();
  if (open.length) {
    // If games are available, join them
    socket.join(open[0].id);
    socket.emit('msg', {
      id: socket.id,
      room: open[0].id
    });
    socket.gameRoom = open[0].id;
    socket.emit('ready');
    socket.to(open[0].id).emit('ready');
  } else {
    // If no open games, make a new one
    const newRoom = `game-${uuid()}`;
    socket.gameRoom = newRoom;
    socket.join(newRoom);
    socket.emit('msg', {
      id: socket.id,
      room: newRoom
    });
  }

  socket.on('score', () => {
    if (socket.score) {
      socket.score++;
    } else {
      socket.score = 1;
    }
    console.log(`[${socket.id}]`, 'score is', socket.score);
  });

  socket.on('end', () => {
    game.getScore(socket.gameRoom, socket.id);
  });

  socket.on('disconnecting', () => {
    console.log(c.red('Dropping Game'), Object.keys(socket.rooms)[1]);
    socket.to(socket.gameRoom).emit('quit');
    console.log(c.red('Client Disconnected'), socket.id);
  });
});
