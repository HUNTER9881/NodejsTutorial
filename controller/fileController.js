const { SINGLE_FILE, MULTI_FILE } = require('../models/filesModel')
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');


exports.createSingleFile = async (req, res, next) => {
    const { filename } = req.file
    const result = new SINGLE_FILE({ image: filename })
    await result.save()
        .then(() => res.json(result))
        .catch((error) => res.json(error))
}
exports.updateSingleFile = async (req, res, next) => {
    // eski faylni ochir
    await SINGLE_FILE.findById(req.params.id).exec((error, data) => {
        if (error) { throw error }
        else {
            const filePath = path.join(__dirname, "../public/uploads/single/" + data.image)
            fs.unlink(filePath, function (error) {
                if (error) {
                    console.log("Old file isn't deleted")
                }
                console.log("Old file is deleted")
            })
        }
    })

    // yangisini yukla
    const { filename } = req.file
    const result = await SINGLE_FILE.findByIdAndUpdate(req.params.id)
    result.image = filename
    await result.save()
        .then(() => res.json(result))
        .catch((error) => res.json(error))
}
exports.deleteSingleFile = async (req, res, next) => {
    await SINGLE_FILE.findById(req.params.id).exec(async (error, data) => {
        if (error) { throw error }
        else {
            const filePath = path.join(__dirname, "../public/uploads/single/" + data.image)
            fs.unlink(filePath, function (error) {
                if (error) {
                    console.log("Old file isn't deleted")
                }
                console.log("Old file is deleted")
            })
            await SINGLE_FILE.findByIdAndDelete(req.params.id)
            res.json({
                message: "Deleted"
            })
        }
    })



}











exports.createMultpleFile = async (req, res, next) => {
    const allFiles = req.files
    const arrayFiles = []
    for (let item of allFiles) {
        const { filename } = item
        arrayFiles.push(filename)
    }
    const result = new MULTI_FILE({ image: arrayFiles })
    await result.save()
        .then(() => res.json(result))
        .catch((error) => res.json(error))
}
exports.updateMultpleFile = async (req, res, next) => {
    await MULTI_FILE.findById(req.params.id).exec((error, data) => {
        if (error) { throw error }
        else {
            const FOUND_FILES = data.image
            for (let item of FOUND_FILES) {
                const file_path_name = path.join(__dirname, `../public/uploads/multi/${item}`)
                fs.unlink(file_path_name, function (error) {
                    if (error) {
                        console.log("Old file isn't deleted")
                    }
                    console.log("Old file is deleted")
                })
            }
        }
    })
    const allFiles = req.files
    const arrayFiles = []
    for (let item of allFiles) {
        const { filename } = item
        arrayFiles.push(filename)
    }
    const result = await MULTI_FILE.findByIdAndUpdate(req.params.id)
    result.image = arrayFiles
    await result.save()
        .then(() => res.json(result))
        .catch((error) => res.json(error))
}
exports.deleteMultpleFile = async (req, res, next) => {
    await MULTI_FILE.findById(req.params.id).exec(async (error, data) => {
        if (error) { throw error }
        else {
            const FOUND_FILES = data.image
            for (let item of FOUND_FILES) {
                const file_path_name = path.join(__dirname, `../public/uploads/multi/${item}`)
                fs.unlink(file_path_name, function (error) {
                    if (error) {
                        console.log("Old file isn't deleted")
                    }
                    console.log("Old file is deleted")
                })
            }
            await MULTI_FILE.findByIdAndDelete(req.params.id)
            res.json({
                message: "Data is deleted"
            })
        }
    })

}











exports.createMultipleSharpedFile = async (req, res, next) => {
    const ARRAY_FILES = []
    const FILES = req.files;
    for (let item of FILES) {
        const { filename } = item;
        ARRAY_FILES.push(filename)

        const ORIGINAL = path.join(path.dirname(__dirname) + `/public/uploads/sharp/original/${filename}`)
        const THUMB = path.join(path.dirname(__dirname) + `/public/uploads/sharp/thumb/${filename}`)

        sharp(ORIGINAL)
            .resize(100, 100)
            .jpeg({ quality: 100 })
            .toFile(THUMB, (error) => {
                if (error) throw error
                console.log("Successfully pasting thumbed file")
                /* 
                    Agar qirqilgan rasm qolib, original rasm o'chirilishini istasangiz 
                    quyidagi komentariyadagi kod dan foydalaning
                */
                // fs.unlink(ORIGINAL, async (error) => {
                //     if (error) { console.log("On removing file occured error") }
                //     console.log("Successfully removing original file")
                // })
            })
    }
    const result = new MULTI_FILE({ image: ARRAY_FILES })
    await result.save()
        .then(() => res.json(result))
        .catch((error) => res.json(error))
}
exports.updateMultipleSharpedFile = async (req, res, next) => {
    const { id } = req.params
    await MULTI_FILE.findById({ _id: id }).exec(async (error, data) => {
        if (error) throw error
        else {
            const FILES = data.image
            for (let item of FILES) {
                const ORIGINAL = path.join(path.dirname(__dirname) + `/public/uploads/sharp/original/${item}`)
                const THUMB = path.join(path.dirname(__dirname) + `/public/uploads/sharp/thumb/${item}`)
                fs.unlink(ORIGINAL, async (error) => {
                    if (error) { console.log("On removing file occured error") }
                    console.log("Successfully removing original file")
                })
                fs.unlink(THUMB, async (error) => {
                    if (error) { console.log("On removing file occured error") }
                    console.log("Successfully removing original file")
                })
            }
        }
    })
    const ARRAY_FILES = []
    const FILES = req.files;
    for (let item of FILES) {
        const { filename } = item;
        ARRAY_FILES.push(filename)
        const ORIGINAL = path.join(path.dirname(__dirname) + `/public/uploads/sharp/original/${filename}`)
        const THUMB = path.join(path.dirname(__dirname) + `/public/uploads/sharp/thumb/${filename}`)
        sharp(ORIGINAL)
            .resize(100, 100)
            .jpeg({ quality: 100 })
            .toFile(THUMB, (error) => {
                if (error) throw error
                console.log("Successfully pasting thumbed file")
                /* 
                    Agar qirqilgan rasm qolib, original rasm o'chirilishini istasangiz 
                    quyidagi komentariyadagi kod dan foydalaning
                */
                // unlink(ORIGINAL, async (error) => {
                //     if (error) { console.log("On removing file occured error") }
                //     console.log("Successfully removing original file")
                // })
            })
    }
    await MULTI_FILE.findByIdAndUpdate({ _id: id }).exec(async (error, data) => {
        if (error) throw error
        else {
            data.image = ARRAY_FILES
            await data.save()
                .then(() => res.json(data))
                .catch((error) => res.json(error))
        }
    })
}
exports.deleteMultipleSharpedFile = async (req, res, next) => {
    const { id } = req.params
    await MULTI_FILE.findById({ _id: id }).exec(async (error, data) => {
        if (error) throw error
        else {
            const FILES = data.image
            for (let item of FILES) {

                const ORIGINAL = path.join(path.dirname(__dirname) + `/public/uploads/sharp/original/${item}`)
                const THUMB = path.join(path.dirname(__dirname) + `/public/uploads/sharp/thumb/${item}`)

                fs.unlink(ORIGINAL, async (error) => {
                    if (error) { console.log("On removing file occured error") }
                    console.log("Successfully removing original file")
                })
                fs.unlink(THUMB, async (error) => {
                    if (error) { console.log("On removing file occured error") }
                    console.log("Successfully removing original file")
                })
            }

            await MULTI_FILE.findByIdAndDelete({ _id: id })
            res.json({ message: "Deleted " })
        }
    })
}











exports.createSingleSharpedFile = async (req, res, next) => {
    const { filename } = req.file;
    const ORIGINAL = path.join(path.dirname(__dirname) + `/public/uploads/sharp/original/${filename}`)
    const THUMB = path.join(path.dirname(__dirname) + `/public/uploads/sharp/thumb/${filename}`)
    sharp(ORIGINAL)
        .resize(100, 100)
        .jpeg({ quality: 100 })
        .toFile(THUMB, (error) => {
            if (error) throw error
            console.log("Successfully pasting thumbed file")
            /* 
                Agar qirqilgan rasm qolib, original rasm o'chirilishini istasangiz 
                quyidagi komentariyadagi kod dan foydalaning
            */
            // fs.unlink(ORIGINAL, async (error) => {
            //     if (error) { console.log("On removing file occured error") }
            //     console.log("Successfully removing original file")
            // })
        })
    const result = new SINGLE_FILE({ image: filename })
    await result.save()
        .then(() => res.json(result))
        .catch((error) => res.json(error))
}
exports.updateSingleSharpedFile = async (req, res, next) => {
    const { id } = req.params

    // eskini o'chirish
    await SINGLE_FILE.findById({ _id: id }).exec(async (error, data) => {
        if (error) throw error
        else {
            const FILES = data.image
            const ORIGINAL = path.join(path.dirname(__dirname) + `/public/uploads/sharp/original/${FILES}`)
            const THUMB = path.join(path.dirname(__dirname) + `/public/uploads/sharp/thumb/${FILES}`)
            fs.unlink(ORIGINAL, async (error) => {
                if (error) { console.log("On removing file occured error") }
                console.log("Successfully removing original file")
            })
            fs.unlink(THUMB, async (error) => {
                if (error) { console.log("On removing file occured error") }
                console.log("Successfully removing original file")
            })
        }
    })

    // yangi faylni yuklash
    const { filename } = req.file;
    const ORIGINAL = path.join(path.dirname(__dirname) + `/public/uploads/sharp/original/${filename}`)
    const THUMB = path.join(path.dirname(__dirname) + `/public/uploads/sharp/thumb/${filename}`)
    sharp(ORIGINAL)
        .resize(100, 100)
        .jpeg({ quality: 100 })
        .toFile(THUMB, (error) => {
            if (error) throw error
            console.log("Successfully pasting thumbed file")
            /* 
                Agar qirqilgan rasm qolib, original rasm o'chirilishini istasangiz 
                quyidagi komentariyadagi kod dan foydalaning
            */
            // unlink(ORIGINAL, async (error) => {
            //     if (error) { console.log("On removing file occured error") }
            //     console.log("Successfully removing original file")
            // })
        })
    await SINGLE_FILE.findByIdAndUpdate({ _id: id }).exec(async (error, data) => {
        if (error) throw error
        else {
            data.image = filename
            await data.save()
                .then(() => res.json(data))
                .catch((error) => res.json(error))
        }
    })
}
exports.deleteSingleSharpedFile = async (req, res, next) => {
    const { id } = req.params
    await SINGLE_FILE.findById({ _id: id }).exec(async (error, data) => {
        if (error) throw error
        else {
            const FILES = data.image
            const ORIGINAL = path.join(path.dirname(__dirname) + `/public/uploads/sharp/original/${FILES}`)
            const THUMB = path.join(path.dirname(__dirname) + `/public/uploads/sharp/thumb/${FILES}`)
            fs.unlink(ORIGINAL, async (error) => {
                if (error) { console.log("On removing file occured error") }
                console.log("Successfully removing original file")
            })
            fs.unlink(THUMB, async (error) => {
                if (error) { console.log("On removing file occured error") }
                console.log("Successfully removing original file")
            })
            await MULTI_FILE.findByIdAndDelete({ _id: id })
            res.json({ message: "Deleted " })
        }
    })
    
}