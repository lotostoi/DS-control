// функция сканирования дерктории, и возвращающая объект пуями и именами кратинок

module.exports =  function ScanDir(dir, link) {

    let path = require('path')
    let fs = require('fs')
    let folderName = dir

    function compare(a, b) {
        if (parseInt(/\d+/.exec(a)) > (/\d+/.exec(b))) return 1
        if (parseInt(/\d+/.exec(a)) == (/\d+/.exec(b))) return 0
        if (parseInt(/\d+/.exec(a)) < (/\d+/.exec(b))) return -1
    }

    files = fs.readdirSync(folderName)

    files.sort(compare)
    files = files.filter(e => /\d+/.exec(e)  && (/.jpg/.test(e)||/.png/.test(e)))
    return files.map(e => {
        return {
            link: (link || '/') + e,
            name: path.parse(e).name
        }
    })
}






