
const {Router} = require('express');
const router = Router();

const {getLoginByUsername, updateLogin, getAllCart} = require('../controllers/login');
const { mailerCheckout } = require('../utils/nodemailer');
const { sendMessage } = require('../utils/SMSTwilio');
const { sendWhatsapp } = require('../utils/whatsappTwilio');


router.get('/', async(req, res)=>{
    const currentSession = req.session.passport.user
    const currentPort = parseInt(process.argv[2]) || 8080
    const login = await getLoginByUsername(currentSession)
    const cartProducts = await getAllCart(currentSession)
    mailerCheckout(login.username, login.names , cartProducts)
    const toUpdate = ({_id: login._id }, { $set: {cart: []}, $push: {order: cartProducts}})
    await updateLogin(toUpdate)
    await sendMessage(login.tel)
    await sendWhatsapp()
    return res.redirect('/api/productos')
})

module.exports = router;