const { get } = require('http');
const path = require('path');

const uploadSingleFile = async (file) => {
    let finalUploadPath = getFinalUploadPath(file);
    await file.mv(finalUploadPath);
    return finalUploadPath;
}

const uploadMultiFile = async (files) => {
    return await files.forEach(file => {
        let uploadPath = getFinalUploadPath(file);
        file.mv(uploadPath);
    });
}

const getFinalUploadPath = (file) => {
    let uploadPath = path.resolve(__dirname, '../public/images/');
    let extname = path.extname(file.name);
    let basename = path.basename(file.name, extname);
    let finalName = `${basename}-${Date.now()}${extname}`;
    return path.resolve(uploadPath, finalName);
}

module.exports = { uploadSingleFile, uploadMultiFile }