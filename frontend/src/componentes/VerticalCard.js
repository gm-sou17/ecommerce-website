import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCard'
import { Link } from 'react-router-dom'
import './VerticalCard.css'

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(8).fill(null)
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()

    await addToCart(e, id)
    await fetchUserAddToCart()
  }

  return (
    <div className="vertical-card-container">
      {loading ? (
        loadingList.map((_, index) => (
          <div
            className="vertical-product-skeleton"
            key={`vertical-skeleton-${index}`}
          >
            <div className="vertical-skeleton-image" />

            <div className="vertical-skeleton-details">
              <div className="vertical-skeleton-line" />
              <div className="vertical-skeleton-line short" />
              <div className="vertical-skeleton-line medium" />
              <div className="vertical-skeleton-button" />
            </div>
          </div>
        ))
      ) : data.length > 0 ? (
        data.map((product) => (
          <Link
            to={`/product/${product?._id}`}
            className="vertical-product-card"
            key={product?._id}
            onClick={scrollTop}
          >
            <div className="vertical-product-image-wrap">
              <img
                src={product?.productImage?.[0]}
                alt={product?.productName || 'Product'}
                className="vertical-product-image"
                loading="lazy"
              />
            </div>

            <div className="vertical-product-details">
              <h2 className="vertical-product-name">
                {product?.productName}
              </h2>

              <p className="vertical-product-category">
                {product?.category}
              </p>

              <div className="vertical-product-prices">
                <span className="vertical-product-selling-price">
                  {displayINRCurrency(product?.sellingPrice)}
                </span>

                <span className="vertical-product-original-price">
                  {displayINRCurrency(product?.price)}
                </span>
              </div>

              <button
                type="button"
                className="vertical-product-cart-btn"
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))
      ) : (
        <div className="vertical-product-empty">
          No products found.
        </div>
      )}
    </div>
  )
}

export default VerticalCard