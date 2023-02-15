
require('dotenv').config()

const logger = require('./logger');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendWhatsapp(){
    try {
        await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            body: `Compra Exitosa, ${new Date().toLocaleString()}`,
            to: `whatsapp:${process.env.MY_PHONE_NUMBER}`
        })
        .then(message => logger.info(message.sid));
    } catch (error) {
        logger.warn(error)
    }

}
module.exports = {sendWhatsapp}