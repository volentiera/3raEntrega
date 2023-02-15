const Products = require('../models/modelProducts')
const logger = require('../utils/logger')


const getProducts = async (req,res)=>{
        try {
            const allCarts = await Products.find()
            return allCarts
        } catch (error) {
            logger.warn(error)
        }
}
const getProductById = async (req, res)=>{
    try {
        const allCarts = await Products.findOne({_id: req})
        return allCarts
    } catch (error) {
        logger.warn(error)
    }
}
const getProductsByCategory = async (req, res)=>{
    try {
        const allCarts = await Products.find({category: req})
        return allCarts
    } catch (error) {
        logger.warn(error)
    }
}
module.exports = {getProductsByCategory,getProductById,getProducts}