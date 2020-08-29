const fs = require('fs')

const editTamplate = (link, title, screen, path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            link,
            'utf-8',
            (err, content) => {
                if (err) {
                    reject({ 'Error': "Error by reading file" })
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

module.exports = editTamplate