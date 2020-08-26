
const path = require('path')

const { Router } = require('express')

const fs = require('fs')

const router = Router()

const scanDir = require('./../scanDir')

// link to index.html
const link = path.join('frontend', 'index.html')

router.get('*', async (req, res) => {

    const rout = req.path.toLowerCase()

    let [, title,] = req.path.split('/')

    // link to some image
    const linkDir = path.join(__dirname, '../..', 'frontend/images')

    // Routs ************************************************//

    // getting some files
    if (rout.includes('.')) {
        res.sendFile(path.join(__dirname, '../..', req.path))
    }
    // getting data about images 
    else if (rout.includes('getdata')) {
        res.send(await scanDir(req.path.replace('/getData', '')))
    }

    // for NorControl
    else if (rout.includes('nocontrol')) {
        res.send(await editTamplate(link, title, 'nocontrol', req.path))
    }

    // for ControlUser
    else if (rout.includes('control')) {
        res.send(await editTamplate(link, title, 'control', req.path))
    }

    // for User
    else if (rout.includes('user')) {
        res.send(await editTamplate(link, title, 'user', req.path))
    }

    else {
        console.log('outher')
        res.sendFile(path.join(__dirname, '../..', req.path))
    }

})

module.exports = router

const editTamplate = (link, title, screen, path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            link,
            'utf-8',
            (err, content) => {
                if (err) {
                    reject({ 'Error': "Error by read file" })
                } else {
                    let res = content
                        .replace('{title}', title)
                        .replace('{screen}', screen)
                        .replace('{link}', path)
                        .replace('{id}', parseInt(path.match(/\d+/)))
                    resolve(res)
                }
            }
        )
    })
} 