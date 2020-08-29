
const { Router } = require('express')

const router = Router()

const scanDir = require('../scanDir')

router.get('/getData/:id', async (req, res) => {

    try {
        const link = "/" + req.params.id.replace('_', '/')
        console.log(req.params.id)
        res.send(await scanDir(link))
    } catch (e) {
        res.json({ 'error': true })
    }
})

module.exports = router