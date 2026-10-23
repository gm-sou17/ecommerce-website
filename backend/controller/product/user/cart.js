const addToCartModel = require('../../../models/cardProduct')

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body
    const existingItem = await addToCartModel.findOne({ productId, userId: req.userId })

    if (existingItem) {
      existingItem.quantity += 1
      await existingItem.save()
    } else {
      await addToCartModel.create({ productId, userId: req.userId, quantity: 1 })
    }

    res.json({ message: 'Product added to cart', success: true, error: false })
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true })
  }
}

const countAddToCartProduct = async (req, res) => {
  try {
    const count = await addToCartModel.countDocuments({ userId: req.userId })
    res.json({ data: { count }, success: true, error: false })
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true })
  }
}

const addToCartViewProduct = async (req, res) => {
  try {
    const data = await addToCartModel.find({ userId: req.userId }).populate('productId')
    res.json({ data, success: true, error: false })
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true })
  }
}

const updateAddToCartProduct = async (req, res) => {
  try {
    const { _id, quantity } = req.body
    const data = await addToCartModel.findOneAndUpdate(
      { _id, userId: req.userId },
      { quantity },
      { new: true }
    )
    res.json({ data, success: Boolean(data), error: !data })
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true })
  }
}

const deleteAddToCartProduct = async (req, res) => {
  try {
    const { _id } = req.body
    const data = await addToCartModel.findOneAndDelete({ _id, userId: req.userId })
    res.json({ data, success: Boolean(data), error: !data })
  } catch (err) {
    res.status(400).json({ message: err.message || err, success: false, error: true })
  }
}

module.exports = {
  addToCartController,
  countAddToCartProduct,
  addToCartViewProduct,
  updateAddToCartProduct,
  deleteAddToCartProduct,
}