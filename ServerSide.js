// io is basically creating our server running on port 8080
const io = require('socket.io')(8080, {
    cors: {
        origin: "*",
      },
});
const users = {};

// everytime a user loads our website this triggers
io.on('connection' , socket => {
    // handling the new user event
    socket.on('new-user', name => {
        users[socket.id] =  name;
        socket.broadcast.emit('user-connected', name);
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message : message, name : users[socket.id]} );
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id];
    })
});

