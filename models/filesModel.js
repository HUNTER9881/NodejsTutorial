const mongoose = require('mongoose');

// @description: Only uploading one file with "multer","md5" and "sharp"
const singleFile = mongoose.Schema({
    image: { type: String, required: true }
}, { timestamps: true })


// @description: Only uploading some file in array with "multer", "md5" and "sharp"
const multiFile = mongoose.Schema({
    image: [{ type: String, required: true }]
}, { timestamps: true })



const SINGLE_FILE = mongoose.model('single_file', singleFile)
const MULTI_FILE = mongoose.model('multi_file', multiFile)

module.exports = {
    SINGLE_FILE, MULTI_FILE
}