module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  io.on(`connection`, socket => {

    const {id: playerId} = socket;

    console.log(playerId);

    socket.on(`disconnect`, () => {
      console.log(`Player[${playerId}] left`);
    });

  });

  next();

};

module.exports.register.attributes = {
  name: `App`,
  version: `0.1.0`
};
