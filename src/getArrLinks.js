const fs = require('fs')

const path = require('path')

const link = path.join(__dirname, '../frontend/images')

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



async function getArrlinksFromDir(link) { 
  
    let res = []
   
    await f(link)
    
    return res

    async function f(dir) {

        if (!dir.includes('.')) {

            let arr = await readDir(dir)

            for (let el of arr) {

                res.push(path.join(dir, el))

                await f(path.join(dir, el))

            }
        }

    }
}

module.exports = getArrlinksFromDir



