const port = 3050
let fs = require('fs')

let express = require('express')()

let server = require('http').createServer(express)

let io = require('socket.io').listen(server)

let ScanDir = require('./src/scanDir')

let scanFolder = ScanDir

let users = []

server.listen(port, () => {
    console.log(`Главный экран - http://localhost:${port}/`)
    console.log(`Управялющий экран - http://localhost:${port}/control`)
})

function ucFirst(str) {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }

express.get('*', (request, respons) => {

    if (request.path.search(/.jpg/) == -1) {
        if (!(/.js/.test(request.path)) && !(/.css/.test(request.path))) {
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
                        addLink = arr[1]

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
        } else {
            respons.set('Content-Type', 'text/css');
            respons.sendFile(__dirname + request.path)
        }

    } else {
        respons.set('Content-Type', 'image/jpeg');
        
        respons.sendFile(__dirname + '/frontend/images/' + request.path)
    }
})


express.post('*', (request, respons) => {
   try {
    respons.send(scanFolder(`./frontend/images${request.path}`, `${request.path}/`))
   } catch(e) {
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




