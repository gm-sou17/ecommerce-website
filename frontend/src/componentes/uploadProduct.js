import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import { MdDelete } from 'react-icons/md'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import './UploadProduct.css'

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  })

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Input fields handle karna
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Product image upload karna
  const handleUploadProduct = async (e) => {
    const file = e.target.files?.[0]

    // Same file dobara select karne ki permission
    e.target.value = ''

    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.')
      return
    }

    setUploadingImage(true)

    try {
      const uploadedImage = await uploadImage(file)

      if (uploadedImage?.url) {
        setData((prev) => ({
          ...prev,
          productImage: [...prev.productImage, uploadedImage.url],
        }))

        toast.success('Image uploaded successfully!')
      } else {
        toast.error('Image upload failed. Please try again.')
      }
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Unable to upload image.')
    } finally {
      setUploadingImage(false)
    }
  }

  // Product image delete karna
  const handleDeleteProductImage = (index) => {
    setData((prev) => ({
      ...prev,
      productImage: prev.productImage.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }))
  }

  // Full screen image preview
  const handlePreviewImage = (imageUrl) => {
    setFullScreenImage(imageUrl)
    setOpenFullScreenImage(true)
  }

  // Product submit karna
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (uploadingImage) {
      toast.info('Please wait until the image upload finishes.')
      return
    }

    if (data.productImage.length === 0) {
      toast.error('Please upload at least one product image.')
      return
    }

    if (Number(data.price) < 0 || Number(data.sellingPrice) < 0) {
      toast.error('Price cannot be negative.')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok || !responseData.success) {
        toast.error(
          responseData?.message || 'Unable to upload product.'
        )
        return
      }

      toast.success(responseData?.message || 'Product uploaded successfully!')

      if (typeof fetchData === 'function') {
        await fetchData()
      }

      onClose()
    } catch (error) {
      console.error('Product upload error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div
        className="upload-product-overlay"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget && !submitting) {
            onClose()
          }
        }}
      >
        <div
          className="upload-product-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-product-title"
        >
          {/* Header */}
          <div className="upload-product-header">
            <div className="upload-product-header-content">
              <h2 id="upload-product-title">Upload Product</h2>
              <p>
                Add product details and images to your GTSOU store.
              </p>
            </div>

            <button
              type="button"
              className="upload-product-close"
              onClick={onClose}
              aria-label="Close upload product modal"
              disabled={submitting}
            >
              <CgClose />
            </button>
          </div>

          {/* Product form */}
          <form
            className="upload-product-form"
            onSubmit={handleSubmit}
          >
            {/* Product name */}
            <label htmlFor="productName">
              Product Name
            </label>

            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter product name"
              value={data.productName}
              onChange={handleOnChange}
              required
            />

            {/* Brand name */}
            <label htmlFor="brandName">
              Brand Name
            </label>

            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter brand name"
              value={data.brandName}
              onChange={handleOnChange}
              required
            />

            {/* Category */}
            <label htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              required
            >
              <option value="">Select Category</option>

              {productCategory.map((item, index) => (
                <option
                  value={item.value}
                  key={`${item.value}-${index}`}
                >
                  {item.label}
                </option>
              ))}
            </select>

            {/* Image upload heading */}
            <label
              htmlFor="uploadImageInput"
              className="upload-full-width "
            >
              Product Images
            </label>

            {/* Image upload dropzone */}
            <label
              htmlFor="uploadImageInput"
              className="upload-product-dropzone upload-full-width "
            >
              <div className="upload-product-dropzone-content">
                <span className="upload-product-cloud-icon">
                  <FaCloudUploadAlt />
                </span>

                <strong>
                  {uploadingImage
                    ? 'Uploading image...'
                    : 'Click to upload product image'}
                </strong>

                <span>
                  Select an image from your device
                </span>

                <span>
                  You can upload multiple images one by one
                </span>
              </div>
            </label>

            <input
              type="file"
              id="uploadImageInput"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProduct}
              disabled={uploadingImage || submitting}
            />

            {/* Image previews */}
            {data.productImage.length > 0 ? (
              <div className="upload-product-previews upload-full-width">
                {data.productImage.map((imageUrl, index) => (
                  <div
                    className="upload-product-preview-item"
                    key={`${imageUrl}-${index}`}
                  >
                    <img
                      src={imageUrl}
                      alt={`Product preview ${index + 1}`}
                      className="upload-product-preview-image"
                      onClick={() => handlePreviewImage(imageUrl)}
                    />

                    <button
                      type="button"
                      className="upload-product-delete-image"
                      aria-label={`Delete image ${index + 1}`}
                      onClick={() => handleDeleteProductImage(index)}
                      disabled={submitting}
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="upload-product-image-note upload-full-width">
                * Please upload at least one product image.
              </p>
            )}

            {/* Price */}
            <label htmlFor="price">
              Original Price (₹)
            </label>

            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter original price"
              min="0"
              step="0.01"
              value={data.price}
              onChange={handleOnChange}
              required
            />

            {/* Selling price */}
            <label htmlFor="sellingPrice">
              Selling Price (₹)
            </label>

            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder="Enter selling price"
              min="0"
              step="0.01"
              value={data.sellingPrice}
              onChange={handleOnChange}
              required
            />

            {/* Description */}
            <label
              htmlFor="description"
              className="upload-full-width"
            >
              Product Description
            </label>

            <textarea
              id="description"
              name="description"
              className="upload-full-width"
              placeholder="Enter product description"
              rows={4}
              value={data.description}
              onChange={handleOnChange}
            />

            {/* Submit button */}
            <button
              type="submit"
              className="upload-product-submit"
              disabled={submitting || uploadingImage}
            >
              {submitting
                ? 'Uploading Product...'
                : uploadingImage
                  ? 'Please Wait...'
                  : 'Upload Product'}
            </button>
          </form>
        </div>
      </div>

      {/* Full screen image viewer */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </>
  )
}

export default UploadProduct


