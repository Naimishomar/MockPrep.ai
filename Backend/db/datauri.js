const dataUriParser = require('datauri/parser.js');
const path = require('path')

const parser = new DataUriParser();

const getDataUri = (file)=>{
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer).content;
}

exports.module = {getDataUri};