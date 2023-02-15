require('dotenv').config()
const nodemailer = require("nodemailer");

async function  mailer(body, username){
    const emailToSend = `${process.env.MAIL}`
    const passwordToSend = `${process.env.MAIL_PASS}`
    const mailOptions = {
    from: 'All Sports Deportes',
    to: emailToSend,
    subject: `Registro Exitoso`,
    html: `
        <h3>${username}</h3><br>
        <h3>${body.names}</h3><br>
        <h3>${body.direccion}</h3><br>
        <h3>${body.edad}</h3><br>
        <h3>${body.tel}</h3><br>
    `
    }
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: emailToSend, // generated ethereal user
          pass: passwordToSend, // generated ethereal password
        }
    })
    try {
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}
async function  mailerCheckout(username, names, products){
    const emailToSend = `${process.env.MAIL}`
    const passwordToSend = `${process.env.MAIL_PASS}`
    const productsMapped = products.map((e)=>{
        return `
        <h3>${e._id}</h3>
        <h3>${e.name}</h3>
        <h3>$ ${e.price}</h3>
        `
    })
    const mailOptions = {
    from: 'All Sports Deportes',
    to: emailToSend,
    subject: `Compra Exitosa`,
    html: `
        <h3>${username}</h3><br>
        <h3>${names}</h3><br>
        ${productsMapped}
    `
    }
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: emailToSend, // generated ethereal user
          pass: passwordToSend, // generated ethereal password
        }
    })
    try {
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { mailer, mailerCheckout }


