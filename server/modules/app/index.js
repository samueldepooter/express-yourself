module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  let rooms = [];

  const socketRooms = io.sockets.adapter.rooms;

  io.on(`connection`, socket => {

    const {id: deviceId} = socket;
    console.log(`${deviceId} joined`);

    const room = {
      code: ``,
      devices: [],
      started: false
    };

    console.log(socketRooms);

    socket.on(`createRoom`, creator => {
      console.log(`${creator} created a new room`);

      let code = generateRandomNumber(1000, 9000);
      room.code = code.toString();
      room.devices.push(deviceId);

      //tussen alle rooms kijken of de gegenereerde room al bestaat
      //als die bestaat -> nieuwe code genereren tot er eentje gemaakt wordt dat nog niet bestaat
      rooms.find(room => {
        while (room.code === code) {
          console.log(`code bestaat al - opnieuw uitvoeren`);
          code = generateRandomNumber(1000, 9000);
        }
      });

      console.log(`Created room ${room.code}`);

      //gegenereede room bij de rooms steken
      rooms.push(room);

      //room joinen
      socket.join(code);

      socket.emit(`createdRoom`, room);
    });

    socket.on(`checkRoom`, code => {
      const roomFound = rooms.find(r => {
        return r.code === code;
      });

      if (roomFound) {
        if (roomFound.started) {
          socket.emit(`busy`, code);
          return;
        } else {
          socket.emit(`found`, code);
        }

      } else {
        socket.emit(`notFound`, code);
      }
    });

    socket.on(`joinRoom`, code => {
      socket.join(code);
      room.code = code;

      const devices = findDevicesInRoom(code);

      socket.broadcast.in(code).emit(`joinedRoom`, devices);
      socket.emit(`joinedRoomSuccess`, devices);
    });

    socket.on(`leaveRoom`, code => {

      socket.leave(code);
      const devices = findDevicesInRoom(code);
      socket.broadcast.in(room.code).emit(`leftRoom`, devices);

    });


    socket.on(`disconnect`, () => {
      console.log(`${deviceId} left`);

      socket.leave(room.code);
      room.code = ``;
      room.devices = [];
      room.started = false;

      //checken of ik in een room zat
      if (room.code) {
        const devices = findDevicesInRoom(room.code);
        socket.broadcast.in(room.code).emit(`leftRoom`, devices);
      }

      //checken of ik een host ben van een room, if so -> room verwijderen
      const isHost = checkHost(deviceId, room);
      if (isHost) {
        rooms = rooms.filter(r => r.code !== room.code);
      } else {
        console.log(`Not a host so no room filter`);
      }


    });

  });

  const findDevicesInRoom = code => {
    const mySocketRoom = socketRooms[code];
    if (!mySocketRoom) return;
    const devices = [];

    Object.keys(mySocketRoom.sockets).forEach(device => devices.push(device));
    return devices;
  };

  const checkHost = (deviceId, room) => {
    const devices = findDevicesInRoom(room.code);
    if (!devices) return;

    const hostId = devices[0];

    if (deviceId === hostId) return true;
    return false;
  };

  const generateRandomNumber = (n1, n2) => {
    return Math.floor(Math.random() * n2) + n1; //generate random nummer tussen 1000 en 9999
  };

  next();

};

module.exports.register.attributes = {
  name: `App`,
  version: `0.1.0`
};
