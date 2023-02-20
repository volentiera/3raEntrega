const logger = require('../utils/logger')
const Login = require('../models/modelLogin')

const getLogin = async (req,res) => {
    try {
        const allLogins= await Login.find()
        return allLogins
    } catch (error) {
        logger.warn(error)
    }
}
const insertLogin = async (req,res)=> {
    try {
        await Login.create(req)
    } catch (error) {
        logger.warn(error)
    }
}
const getAllCart = async(req, res)=>{
    try {
        const selectedLogin = await Login.findOne({username: req})
        return selectedLogin.cart
    } catch (error) {
        logger.warn(error)
    }
}
const getLoginByUsername = async (req, res)=>{
    try {
        const selectedLogin = await Login.findOne({username: req})
        return selectedLogin
    } catch (error) {
        logger.warn(error)
    }
}
const updateLogin = async(req, res)=>{
    try {
        const updatedLogin = await Login.replaceOne(req.search, req.login)
        return updatedLogin
    } catch (error) {
        logger.warn(error)
    }
}

module.exports = {getLogin, insertLogin, getLoginByUsername, updateLogin, getAllCart}