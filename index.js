const port = 3050

let path = require('path')

let express = require('express')

let app = express()

let server = require('http').createServer(app)

let io = require('socket.io').listen(server)

const mainRouter = require('./src/routes/mainRout')

app.use(express.static(path.join(__dirname, 'frontend')))


app.use(mainRouter)


io.sockets.on('connection', function (socket) {


    socket.on('touchLeft', (data) => {

        io.sockets.emit('touchLeftServer', data)

    })

    socket.on('touchRight', (data) => {

        io.sockets.emit('touchRightServer', data)

    })

});



server.listen(port, () => {
    console.log(`Проект запущен на - http://localhost:${port}/`)
})
