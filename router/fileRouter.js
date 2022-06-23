const express = require('express');
const router = express.Router()
const fileController = require('../controller/fileController')
const multer = require('multer');
const md5 = require('md5')
const path = require('path')

// @description: For creating one files
const SingleFileStorage = multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './public/uploads/single') },
    filename: function (req, file, callback) { callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`) }
})
const single_file = multer({ storage: SingleFileStorage });
// @description: For creating multiple files
const MultiFileStorage = multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './public/uploads/multi') },
    filename: function (req, file, callback) { callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`) }
})
const multi_file = multer({ storage: MultiFileStorage });





// @description: For creating one files
const SharpedSingleFileStorage = multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './public/uploads/sharp/original') },
    filename: function (req, file, callback) { callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`) }
})
const sharpedFiles = multer({ storage: SharpedSingleFileStorage });





// @description: 1 ta fayl yuklash 
// @method: POST
// @rest-api: /api/file/single
router.post('/single', single_file.single('filename'), fileController.createSingleFile)
// @description: yuklangan 1 ta faylni tahrirlash
// @method: PUT
// @rest-api: /api/file/single/:id
router.put('/single/:id', single_file.single('filename'), fileController.updateSingleFile)
// @description: yuklangan 1 ta faylni o'chirish
// @method: DELETE
// @rest-api: /api/file/single/:id
router.delete('/single/:id', fileController.deleteSingleFile)




// @description: 2 ta va unda ortiq fayllarni yuklash
// @method: POST
// @rest-api: /api/file/multiple
router.post('/multiple', multi_file.array('filename', 12), fileController.createMultpleFile)
// @description: yuklangan 2 ta va unda ortiq fayllarni tahrirlash
// @method: PUT
// @rest-api: /api/file/multiple/:id
router.put('/multiple/:id', multi_file.array('filename', 12), fileController.updateMultpleFile)
// @description: yuklangan 2 ta va unda ortiq fayllarni o'chirish
// @method: DELETE
// @rest-api: /api/file/multiple/:id
router.put('/multiple/:id', fileController.deleteMultpleFile)








// @description: 2 tadan oshiq faylni qirqgan holatda yuklash (yuklangan holatda original faylni ochirib yuborish va qirqilganini qoldirish)
// @method: POST
// @rest-api: /api/file/sharp
router.post('/sharp', sharpedFiles.array('filename', 12), fileController.createMultipleSharpedFile)
// @description: 2 tadan oshiq faylni qirqgan holatda tahrirlash (yuklangan holatda original faylni ochirib yuborish va qirqilganini qoldirish)
// @method: POST
// @rest-api: /api/file/sharp/:id
router.put('/sharp/:id', sharpedFiles.array('filename', 12), fileController.updateMultipleSharpedFile)
// @description: 2 tadan oshiq faylni qirqgan holatda o'chirish 
// @method: POST
// @rest-api: /api/file//sharp/:id
router.delete('/sharp/:id', fileController.deleteMultipleSharpedFile)











// @description: 1 ta faylni qirqgan holatda yuklash (yuklangan holatda original faylni ochirib yuborish va qirqilganini qoldirish)
// @method: POST
// @rest-api: /api/file/sharp_single
router.post('/sharp_single', sharpedFiles.single('filename'), fileController.createSingleSharpedFile)
// @description:  1 ta faylni qirqgan holatda tahrirlash (yuklangan holatda original faylni ochirib yuborish va qirqilganini qoldirish)
// @method: POST
// @rest-api: /api/file/sharp_single/:id
router.put('/sharp_single/:id', sharpedFiles.single('filename'), fileController.updateSingleSharpedFile)
// @description:  1 ta faylni qirqgan holatda o'chirish 
// @method: POST
// @rest-api: /api/file/sharp_single
router.delete('/sharp_single/:id', fileController.deleteSingleSharpedFile)









module.exports = router