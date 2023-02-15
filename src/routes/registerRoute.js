const {Router} = require('express');
const bcryptjs = require('bcryptjs')
const { mailer } = require('../utils/nodemailer');
const router = Router();


const {getLogin, insertLogin} = require('../controllers/login')

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

passport.use('register', new LocalStrategy({passReqToCallback: true},async (req, username, password, done )=>{
    const user = await getLogin()
    const userObtained = user.find(u => u.username === username)
    
    if (userObtained){
        return done('usuario registrado')
    }
    mailer(req.body, username)
    let encryptedPassword = await bcryptjs.hash(password, 8)
    const newUser = {
        username: username,
        password: encryptedPassword,
        names: req.body.names,
        direccion: req.body.direccion,
        edad: req.body.edad,
        tel: req.body.tel,
        url: req.body.url
    }
    await insertLogin(newUser)
    return done(null, newUser)
}))

passport.serializeUser( async function (user, done){
    done(null, user.username)
})
passport.deserializeUser(async function (username,done){
    const user = await getLogin()
    const userSelected = user.find(u=>u.username === username)
    done(null, userSelected)
})

router.use(passport.initialize())
router.use(passport.session())



router.get('/', async(req,res)=>{
    res.render('registerPage.ejs')
})
router.post('/', passport.authenticate('register',{failureRedirect: '/failedregister', successRedirect:'/'}));

router.get('/failedregister',(req, res)=>{
    res.json('error')
})
module.exports = router;