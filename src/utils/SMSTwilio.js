
require('dotenv').config()

const logger = require('./logger');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendMessage(userPhoneNumber){
    try {
        await client.messages.create({
            from: `${process.env.TWILIO_PHONE_NUMBER}`,
            body: 'Orden Realizada, su pedido esta en proceso',
            to: `${userPhoneNumber}`
        })
        .then(message => logger.info(message.sid));
    } catch (error) {
        logger.warn(error)
    }

}
module.exports = {sendMessage}