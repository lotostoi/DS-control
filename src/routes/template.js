
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
       
            return res.send(await editTamplate(link, first, 'control', l))
        }

        if (first.startsWith('nocontrol')) {
       
            return res.send(await editTamplate(link, first, 'nocontrol', l))
        }

        if (first.startsWith('user')) {
        

            return res.send(await editTamplate(link, first, 'user', l))
        }

        if (first.startsWith('scrol')) {
      

            return res.send(await editTamplate(link, first, 'scrol', l))
        }

        if (first.includes('multi')) {
            console.log('multi')

            return res.send(await editTamplate(path.join('frontend', 'multi.html'), first, 'multi', l))
        }

  
        res.send("<h1> Page isn't  found </h1>")
    } catch (e) {
        console.log(e)
        res.send(`<h1> Page isn't  found  ${e}</h1>`)
    }

})

module.exports = router



