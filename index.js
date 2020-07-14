const port = 3050

let express = require('express')()

let server = require('http').createServer(express)

let io = require('socket.io').listen(server)

let ScanDir = require('./scanDir')

let scanFolder = ScanDir


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


express.post('/getImg', (request, respons) => {
    respons.send(scanFolder("./frontend/img", "./frontend/img/"))
})




io.sockets.on('connection', function (socket) {


    socket.on('touchLeft', () => {

       
        io.sockets.emit('touchLeftServer')

    })

    socket.on('touchRight', () => {

       
        io.sockets.emit('touchRightServer')

    })

});




