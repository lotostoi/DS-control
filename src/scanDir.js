// функция сканирования дерктории, и возвращающая объект пуями и именами кратинок

const { isNumber } = require('util')

let path = require('path')
let fs = require('fs')



module.exports = async function ScanDir(dir) {

    let folderName = path.join('frontend', 'images', dir)

    function compare(a, b) {

        if (parseInt(/\d+/.exec(a)) > (/\d+/.exec(b))) return 1
        if (parseInt(/\d+/.exec(a)) == (/\d+/.exec(b))) return 0
        if (parseInt(/\d+/.exec(a)) < (/\d+/.exec(b))) return -1
    }

    let files = await readDir(folderName)
  
    // Убиреам из масива не картинки
    files = files.filter(e => /.jpg/.test(e) || /.png/.test(e) || /.mp4/.test(e) || /.vom/.test(e))

    checkOnNumber = files.every(e => /\d+/.exec(e))


    if (isNumber) {
        files.sort(compare)
    }

    return files.map(e => {
        return {
            link: path.join('/frontend', 'images', dir, e),
            name: path.parse(e).name,
            teg: /.jpg/.test(e) || /.png/.test(e) ? 'img' : 'video'
        }
    })
}


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



