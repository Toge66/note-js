import {readFile,writeFile} from 'fs'
import {resolve as r} from 'path'
import {promisify} from 'util'

promisify(readFile)(r(__dirname,'../package.json'))
.then(JSON.parse)
.then(data => {
    console.log(data)
    writeFile(r(__dirname,'../name.txt'),data.name)
})