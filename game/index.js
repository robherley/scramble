class Game {
  constructor(io) {
    this._io = io;
  }

  getAllRooms() {
    // List all socket rooms (includes default per client rooms)
    return this._io.sockets.adapter.rooms;
  }

  getGameRooms() {
    // List rooms that are games (prefixed)
    const rooms = this.getAllRooms();
    return (
      Object.keys(rooms)
        .filter(e => e.slice(0, 4) === 'game')
        .map(e => {
          return { id: e, ...rooms[e] };
        }) || undefined
    );
  }

  getOpenRooms() {
    return this.getGameRooms().filter(e => e.length === 1);
  }

  getClients() {
    // All connected clients
    return Object.keys(this._io.sockets.clients().connected);
  }

  getScore(gameid, client) {
    const players = Object.keys(this.getAllRooms()[gameid].sockets).map(
      e => this._io.sockets.clients().connected[e]
    );
    console.log(players[0].score, 'vs', players[1].score);
    if (players[0].score === players[1].score) {
      this._io.to(client).emit('tie');
    } else {
      const winner =
        players[0].score > players[1].score ? players[0].id : players[1].id;
      if (winner === client) {
        this._io.to(client).emit('winner');
      } else {
        this._io.to(client).emit('loser');
      }
    }
  }
}

module.exports = Game;
