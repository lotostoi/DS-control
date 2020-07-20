const port = 3050
let fs = require('fs')

let express = require('express')()

let server = require('http').createServer(express)

let io = require('socket.io').listen(server)

let ScanDir = require('./src/scanDir')

let scanFolder = ScanDir

let cotalog = fs.readdirSync('frontend/images')

server.listen(port, () => {
    console.log(`Главный экран - http://localhost:${port}/`)
    console.log(`Управялющий экран - http://localhost:${port}/control`)
})


express.get('*', (request, respons) => {

    if (request.path.search(/.jpg/) == -1) {
        if (!(/.js/.test(request.path)) && !(/.css/.test(request.path))) {
            fs.readFile("./frontend/index.html", "utf8", function (error, data) {
                let screen = request.path;

                if (cotalog.find(e => e == screen.replace(/\//,''))) {
                    data = data.replace("{title}", screen.replace(/\//,'')).replace("{screen}",screen.replace(/\//,''));
                    respons.end(data);
                } else {
                    respons.end(`<h1>The folder "${screen.replace(/\//,'')}" is absent</h1>`);
                }
            })
        } else {
            respons.set('Content-Type', 'text/css');
            respons.sendFile(__dirname + request.path)
        }

    } else {
        respons.set('Content-Type', 'image/jpeg');
        respons.sendFile(__dirname + request.path)
    }
})


express.post('*', (request, respons) => {
    respons.send(scanFolder(`./frontend/images${request.path}`, `./frontend/images${request.path}/`))
})




io.sockets.on('connection', function (socket) {


    socket.on('touchLeft', () => {


        io.sockets.emit('touchLeftServer')

    })

    socket.on('touchRight', () => {


        io.sockets.emit('touchRightServer')

    })

});




