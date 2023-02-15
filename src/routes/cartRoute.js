
const {Router} = require('express');
const router = Router();

const {getProductById} = require('../controllers/products')
const {getLoginByUsername, updateLogin, getAllCart} = require('../controllers/login')

router.get('/:id', async  (req, res) => {
        const productSelected = await getProductById(req.params.id)
        const currentSession = req.session.passport.user
        const login = await getLoginByUsername(currentSession)
        const currentPort = parseInt(process.argv[2]) || 8080
        const toUpdate = ({_id: login._id }, { $push: {cart: productSelected}})
        await updateLogin(toUpdate)
        return res.redirect('/api/productos');
})
router.get('/', async (req,res)=>{
    const currentSession = req.session.passport.user
    const currentPort = parseInt(process.argv[2]) || 8080
    const cartProducts = await getAllCart(currentSession)
    return res.render('cartPage', {cartProducts, currentSession, currentPort });
})


module.exports = router;