// функция сканирования дерктории, и возвращающая объект пуями и именами кратинок

const { isNumber } = require('util')

module.exports = function ScanDir(dir, link) {

    let path = require('path')
    let fs = require('fs')
    let folderName = dir
    // 
    function compare(a, b) {

        if (parseInt(/\d+/.exec(a)) > (/\d+/.exec(b))) return 1
        if (parseInt(/\d+/.exec(a)) == (/\d+/.exec(b))) return 0
        if (parseInt(/\d+/.exec(a)) < (/\d+/.exec(b))) return -1
    }

    files = fs.readdirSync(folderName)
    // Убиреам из масива не картинки
    files = files.filter(e => /.jpg/.test(e) || /.png/.test(e) || /.mp4/.test(e) || /.vom/.test(e))

    checkOnNumber = files.every(e => /\d+/.exec(e))


    if (isNumber) {
        files.sort(compare)
    }

    return files.map(e => {
        return {
            link: (link || '/') + e,
            name: path.parse(e).name,
            teg: /.jpg/.test(e) || /.png/.test(e) ? 'img' : 'video'
        }
    })
}






