const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/product/user/userSingup")
const userSignInController = require('../controller/product/user/userSingin')
const userDetailsController = require('../controller/product/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/product/user/userLogout')
const allUsers = require('../controller/product/user/allUsers')
const updateUser = require('../controller/product/user/updateUser')
const UploadProductController = require('../controller/product/product/uploadProduct')
const getProductController = require('../controller/product/product/getProduct')
const updateProductController = require('../controller/product/product/updateProduct')
const getCategoryProduct = require('../controller/product/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/product/getProductDetails')
const { addToCartController, countAddToCartProduct, addToCartViewProduct, updateAddToCartProduct, deleteAddToCartProduct } = require('../controller/product/user/cart')
const searchProduct = require('../controller/product/product/searchProduct')
const filterProductController = require('../controller/product/product/filterProduct')



router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

router.use('/imagekit', require('./imagekit'))






module.exports = router