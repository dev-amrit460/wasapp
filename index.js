const express = require('express')
const app=express()
const server= require('http').Server(app)
const io= require('socket.io')(server)

const PORT=process.env.PORT ||5000
server.listen(5000, () => {
    console.log('App listening on port 5000!');
});

const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name =>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})