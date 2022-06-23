const UserModel = require('../models/userModel')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { jwt_secret, exprire } = require('../config/config')
const nodemailer = require('nodemailer')


exports.register = async (req, res, next) => {
    const { name, phone, email } = req.body
    const user = new UserModel({
        name: name, phone: phone, password: "1", email: email
    })
    await user.save()
        .then(() => res.json(user))
        .catch((e) => res.json(e))
}


exports.session_auth = async (req, res, next) => {
    const { phone, password } = req.body
    if (phone == "" || password == "" || !phone || !password) {
        res.json("PHONE and PASSWORD are not defined")
    }
    const result = await UserModel.findOne({ phone: phone }).select({
        name: 1, phone: 1, _id: 1, role: 1, password: 1
    })
    if (!result) {
        res.json("PHONE is not defined")
    }
    else {
        const Compare_Password = await compare(password, result.password)

        if (!Compare_Password || Compare_Password === false) {
            res.json("PASSWORD is not defined")
        }
        else {
            const session = req.session
            const { user } = session
            user = { userId: result._id }
            user.save()
            res.json(session)
        }
    }
}


exports.decode_session = async (req, res, next) => {
    const { user } = req.session
    if (!user) {
        res.json({ message: "Session is not defined" })
    } else {
        res.json(user)
    }
}


exports.encode_session = async (req, res, next) => {
    const cookie = req.cookies
    if (!cookie) {
        res.json({ message: "Cookie is not defined" })
    } else {
        res.json(cookie)
    }
}


exports.delete_session = async (req, res, next) => {
    const session = req.session
    session.destroy()
    res.clearCookie("connect.sid")
    res.json({ message: "Deleting session successfully" })
}


exports.token_auth = async (req, res, next) => {
    const { phone, password } = req.body
    if (phone == "" || password == "" || !phone || !password) {
        res.json("PHONE and PASSWORD are not defined")
    }
    const result = await UserModel.findOne({ phone: phone }).select({
        name: 1, phone: 1, _id: 1, role: 1, password: 1
    })
    if (!result) {
        res.json("PHONE is not defined")
    }
    else {
        const Compare_Password = await compare(password, result.password)

        if (!Compare_Password || Compare_Password === false) {
            res.json("PASSWORD is not defined")
        }
        else {
            const token = sign({ name: result.name, _id: result._id }, jwt_secret, { expiresIn: exprire })
            res.header({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' })
            res.json({ token })
        }
    }
}


exports.decode_token = async (req, res) => {
    const token = req.headers.authorization
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const buffer = new Buffer(base64, "base64")
    const payload_INITIAL = buffer.toString("ascii")
    const payload = JSON.parse(payload_INITIAL)
    res.json({ payload })
}


exports.getAll = async (req, res) => {
    const data = await UserModel.find().sort({ createAt: -1 })
    res.json({
        success: true,
        data
    })
}


exports.getOne = async (req, res) => {
    const data = await UserModel.findById(req.params.id)
    res.json({ data })
}


exports.deletedOne = async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id)
    res.json({ success: true })
}



exports.sendEmail = async (req, res, next) => {

    const { email } = req.body

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 2525,
        auth: {
            user: 'kamina94@inbox.ru',
            pass: '+998915700004'
        },
    }, {
        from: 'Admin <kamina94@inbox.ru>'
    });

    transporter.sendMail({
        from: "kamina94@inbox.ru",
        to: "shahriyormacbook0707@gmail.com",
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<p> HTML version of the message </p>"
    }, (err, info) => {
        if (err) return console.log(err)
        console.log(info)
    })

    res.json({
        message: "Xabar jonatildi"
    })

}



