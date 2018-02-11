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
}

module.exports = Game;
