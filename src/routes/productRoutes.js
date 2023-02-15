
const {Router} = require('express');
const router = Router();

const {getProducts , getProductById, getProductsByCategory} = require('../controllers/products')


router.get('/', async  (req, res) => {
        const products = await getProducts()
        const currentSession = req.session.passport.user
        const currentPort = parseInt(process.argv[2]) || 8080
        return res.render('index', {products, currentSession, currentPort });
})

router.get('/:id', async( req, res)=>{
        const product = await getProductById(req.params.id)
        const currentPort = parseInt(process.argv[2]) || 8080
        if (product){
                const currentSession = req.session.passport.user
                return res.render('infoPage', {currentPort, currentSession, product })
        }else{
                return res.render('errorPage', {currentPort})
        }

})
router.get('/category/:category', async(req,res)=>{
        const products = await getProductsByCategory(req.params.category)
        const currentSession = req.session.passport.user
        const currentPort = parseInt(process.argv[2]) || 8080
        return res.render('index', {products, currentSession, currentPort });
})

module.exports = router;