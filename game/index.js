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
    console.log(players[0].score || 0, 'vs', players[1].score || 0);
    if (players[0].score === players[1].score) {
      this._io.to(client).emit('tie');
    } else {
      if ((players[0].score || 0) > (players[1].score || 0)) {
        this._io.to(players[0].id).emit('winner');
        this._io.to(players[1].id).emit('loser');
      } else {
        this._io.to(players[1].id).emit('winner');
        this._io.to(players[0].id).emit('loser');
      }
    }
  }
}

module.exports = Game;
