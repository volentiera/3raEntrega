
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
    const currentLogin ={
        _id: login._id,
        username: login.username,
        password: login.password,
        names: login.names,
        direccion: login.direccion,
        edad: login.edad,
        tel: login.tel,
        url: login.url,
        cart: login.cart,
        order: login.order
    }
    currentLogin.order.push(login.cart)
    currentLogin.cart = []
    const toUpdate = {search: {_id: login._id }, login: currentLogin}
    await updateLogin(toUpdate)
    await sendMessage(login.tel)
    await sendWhatsapp()
    return res.redirect('/api/productos')
})

module.exports = router;