

const { Router } = require('express')

const router = Router()

const path = require('path')




router.get('*', async (req, res) => {

    let rout = req.path.toLowerCase()
   

    if (rout.includes('.')) {
        res.sendFile(path.join(__dirname, '../..', req.path))
    } else { 
        res.send("<h1> Page isn't  found </h1>")
    }

})

module.exports = router