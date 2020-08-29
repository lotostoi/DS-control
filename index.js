const port = 3097

let path = require('path')

let express = require('express')

let app = express()

let server = require('http').createServer(app)

let io = require('socket.io').listen(server)

const templateRouter = require('./src/routes/template')

const getDataRouter = require('./src/routes/getData')

const content = require('./src/routes/content')

const getAllLinksFromDir = require('./src/getArrLinks')


/* app.use(async (req, res, next) => {
    let link = path.join(__dirname, 'frontend','images')
    let links = await getAllLinksFromDir(link) 
    req.links = links
    next()
})
 */

app.use(express.static(path.join(__dirname, 'frontend')))

app.get('/', (req, res) => {
    res.send("<h1> Page isn't  selected </h1>")
})

app.use(getDataRouter)

app.use(templateRouter)

app.use(content)

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
