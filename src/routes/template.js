
const path = require('path')

const { Router } = require('express')

const fs = require('fs')

const router = Router()

const scanDir = require('./../scanDir')

// link to index.html
const link = path.join('frontend', 'index.html')

const editTamplate = require('../editTemplate')

router.get('/tp/:id', async (req, res) => {

    const l = req.params.id.replace('_', '/')

    let [first, second = ''] = l.toLowerCase().split('/')

    try {
        if (first.endsWith('control')) {
       /*      let lin = req.links.find(link => link.toLowerCase().endsWith(l))
            let newlin = lin.split('\\')[lin.split('\\').length - 1]
            console.log(newlin) */
            return res.send(await editTamplate(link, first, 'control', l))
        }

        if (first.startsWith('nocontrol')) {
       /*      let lin = req.links.find(link => link.toLowerCase().endsWith(l))
            let newlin = lin.split('\\')[lin.split('\\').length - 2] + '/' + lin.split('\\')[lin.split('\\').length - 1] */
            return res.send(await editTamplate(link, first, 'nocontrol',l))
        }

        if (first.startsWith('user')) {
           /*  let lin = req.links.find(link => link.toLowerCase().endsWith(l))
            let newlin = lin.split('\\')[lin.split('\\').length - 2] + '/' + lin.split('\\')[lin.split('\\').length - 1] */

            return res.send(await editTamplate(link, first, 'user', l))
        }

        if (first.startsWith('scrol')) {
           /*  let lin = req.links.find(link => link.toLowerCase().endsWith(l))
            let newlin = lin.split('\\')[lin.split('\\').length - 2] + '/' + lin.split('\\')[lin.split('\\').length - 1] */

            return res.send(await editTamplate(link, first, 'scrol', l))
        }
        res.send("<h1> Page isn't  found </h1>")
    } catch (e) {
        res.send("<h1> Page isn't  found </h1>")
    }

})

module.exports = router
