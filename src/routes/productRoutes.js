
const {Router} = require('express');
const router = Router();

const {getProducts} = require('../controllers/products')


router.get('/', async  (req, res) => {
        const products = await getProducts()
        const currentSession = req.session.passport.user
        const currentPort = parseInt(process.argv[2]) || 8080
        return res.render('index', {products, currentSession, currentPort });
})



module.exports = router;