import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express)

app.post('/mail', (req, res) =>{
    const {to, subject, message} = req.body
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    transporter.sendMail({
        from: "email@teste.com",
        to: to,
        subject: subject,
        html: message
    })
    res.json({ok: true})
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}...`)
})