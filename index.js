const port = 3200

let express = require('express')()
let server = require('http').createServer(express)

let io = require('socket.io').listen(server)

server.listen(port, () => {
    console.log(`Главный экран - http://localhost:${port}/`)
    console.log(`Управялющий экран - http://localhost:${port}/control`)
})



express.get('*', (request, respons) => {

    if (request.path.search(/.jpg/) == -1) {
        if (request.path == '/') {
            respons.sendFile(__dirname + '/frontend/index.html')

        } else if (request.path == '/control') {
            respons.sendFile(__dirname + '/frontend/control.html')
        } else {
            respons.set('Content-Type', 'text/css');
            respons.sendFile(__dirname + request.path)
        }

    } else {
        respons.set('Content-Type', 'image/jpeg');
        respons.sendFile(__dirname + request.path)
    }
})

let connections = [],
    numcon = 0;


io.sockets.on('connection', function (socket) {

    numcon++
    connections.push(socket.id)
   
    io.sockets.emit('sendid', { numCon: numcon, connections: connections, id: socket.id })



    socket.on('clickTest', (data) => {
        io.sockets.emit('kk', { id: data })
    })


    socket.on('mous active', (data) => {

        io.sockets.emit('sendMous', { id: socket.id, cor: data })
    })

    // события лупы

    socket.on('mouseover_soket', (data) => {
        io.sockets.emit('mouseover_soket_server', { id: socket.id, data: data })
    })

    socket.on('mouseleave_soket', (data) => {
        io.sockets.emit('mouseleave_soket_server', { id: socket.id, data: data })
    })

    socket.on('mousemove_soket', (data) => {

        io.sockets.emit('mousemove_soket_server', { id: socket.id, data: data })
    })
    socket.on('load_soket', (data) => {
        io.sockets.emit('load_soket_server', { id: socket.id, data: data })
    })


    // события лупы сенсорный экран 

    socket.on('touchstart_soket', (data) => {

        io.sockets.emit('touchstart_soket_server', { id: socket.id, data: data })
    })

    socket.on('touchend_soket', (data) => {
        io.sockets.emit('touchend_soket_server', { id: socket.id, data: data })
    })

    socket.on('touchmove_soket', (data) => {

        io.sockets.emit('touchmove_soket_server', { id: socket.id, data: data })

    })

});




