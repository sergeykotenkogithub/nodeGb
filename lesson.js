const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, './index.html');
    const readSteam = fs.createReadStream(indexPath);
    readSteam.pipe(res);
});

const io = socket(server);

io.on('connection', (client) => {
    const randomIdforNickName = Math.floor(Math.random() * 999999);
    const nickName = `User ${randomIdforNickName}`;
    io.emit('nick', {
        name: nickName
    })
    io.emit('join', {
        name: `Connect: ${nickName}`
    })
    client.on('disconnect', () => {
        io.emit('notJoin', {
            name: `Disconnect: ${nickName}`
        })
    });
    console.log('connection');
    client.on('newMessage', (data) => {
        console.log(data);
        console.log(nickName);
        client.broadcast.emit('newMessage', data);
        client.emit('newMessage', data);
    });
});

server.listen(8085);