
const { Router } = require('express')

const router = Router()

const scanDir = require('../scanDir')

const path = require('path')

const fs = require('fs')

router.get('/getData/:id', async (req, res) => {

    try {

        const l = req.params.id.replace('_', '/')

        let [first, second = ''] = l.toLowerCase().split('/')

        if (req.params.id.includes('multi')) {

            let link = path.join(__dirname, '../../frontend/images', first)

            let folders = await readDir(link)

            let sliders = []

            await (async () => {

                for (let f of folders) {

                    let newLink = path.join(first, f)

                    sliders.push(await scanDir(newLink))
                }
            })()

     //       console.log(sliders)

            res.send(sliders)

        } else {
            const link = "/" + req.params.id.replace('_', '/')
            res.send(await scanDir(link))
        }

    } catch (e) {
        console.log(e)
        res.json({ 'error': true })
    }
})

module.exports = router

let readDir = (link) => {
    return new Promise((resolve, reject) => {
        fs.readdir(
            link,
            'utf-8',
            (err, files) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(files)
                }

            }
        )
    })
}