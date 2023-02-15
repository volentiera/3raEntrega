
const {Router} = require('express')
const isAuth = require('../utils/auth')
const logger = require('../utils/logger')
const passport = require('passport')

const router = Router()

const routeProducts = require('./productRoutes')
const routeLogin = require('./loginRoute')
const routeRegister = require('./registerRoute')
const routeLogout = require('./logoutRoute')
const routeCart = require('./cartRoute')
const routeCheckOut = require('./checkoutRoute')



router.use(passport.initialize())
router.use(passport.session())


router.use('/api/productos',isAuth, routeProducts)
router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use('/logout', routeLogout)
router.use('/api/carrito', routeCart)
router.use('/api/checkout', routeCheckOut)


router.get('/', (req, res) => {
    res.redirect('/api/productos')
})
router.get('*', (req, res) => {
    const currentPort = parseInt(process.argv[2]) || 8080
    logger.warn(`Route: ${req.path} 404 Not Found Method: ${req.method} `);
    return res.render("errorPage", {currentPort})
});


module.exports = router;