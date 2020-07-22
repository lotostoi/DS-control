const port = 3050
let fs = require('fs')

let express = require('express')()

let server = require('http').createServer(express)

let io = require('socket.io').listen(server)

let ScanDir = require('./src/scanDir')

let scanFolder = ScanDir

server.listen(port, () => {
    console.log(`Проект запущен на - http://localhost:${port}/`)
})

function ucFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

express.get('*', (request, respons) => {

    if (request.path.search(/.css/) != -1) {
        respons.set('Content-Type', 'text/css');
        respons.sendFile(__dirname + request.path)
    } else if (request.path.search(/.js/) != -1) {
        respons.set('Content-Type', 'application/javascript');

        respons.sendFile(__dirname + request.path)
    } else if (request.path.search(/.png/) != -1) {
        respons.set('Content-Type', 'image/png');
        respons.sendFile(__dirname + '/frontend/images/' + request.path)
    }
    else if (request.path.search(/.jpg/) != -1) {
        respons.set('Content-Type', 'image/jpeg');
        respons.sendFile(__dirname + '/frontend/images/' + request.path)
    } 
    else if (request.path.search(/.mp4/) != -1) {
        respons.set('Content-Type', 'video/mp4');
        respons.sendFile(__dirname + '/frontend/images/' + request.path)
    } else {
        fs.readFile("./frontend/index.html", "utf8", function (error, data) {
            try {
                let baseLink = '', addLink = '', arr = []

                let screen = request.path;
                if (/Control/.test(screen)) {

                    baseLink = ucFirst(screen.replace('Control', '').replace('/', ''))

                } else {

                    arr = (screen.split('/')).slice(1, screen.split('/').length)

                    // User's name
                    baseLink = ucFirst(arr[0])


                    // folder's name
                    addLink = ucFirst(arr[1])
                 
                }
                // scun current folder
                let cotalog = fs.readdirSync('frontend/images/' + baseLink)
                if (addLink) {
                    if (cotalog.find(e => e == addLink)) {
                       

                        data = data.replace("{title}", arr[1]).replace("{screen}", baseLink + '/' + addLink).replace('{id}', baseLink);
                        respons.end(data);
                    } else {
                        respons.end(`<h1>The folder "${arr[1]}" is absent "${baseLink}"</h1>`);
                    }
                } else {
                    data = data.replace("{title}", arr[1]).replace("{screen}", screen.replace('/', '')).replace('{id}', baseLink);
                    respons.end(data);
                }

            } catch (e) {
                respons.end(`<h1>We have error: "${e}" </h1>`);
            }
        })
    }
})


express.post('*', (request, respons) => {
    try {
        respons.send(scanFolder(`./frontend/images${request.path}`, `${request.path}/`))
    } catch (e) {
        respons.end(`<h1>We have error: "${e}" </h1>`);
    }

})


io.sockets.on('connection', function (socket) {


    socket.on('touchLeft', (data) => {

        io.sockets.emit('touchLeftServer', data)

    })

    socket.on('touchRight', (data) => {

        io.sockets.emit('touchRightServer', data)

    })

});




