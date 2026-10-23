import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCard'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'
import './CategroyWiseProductDisplay.css'

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const productSliderRef = useRef(null)

  const loadingList = new Array(6).fill(null)
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()

    await addToCart(e, id)

    if (fetchUserAddToCart) {
      fetchUserAddToCart()
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setData(categoryProduct?.data || [])
    } catch (error) {
      console.error('Failed to fetch category products:', error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [category])

  const scrollProducts = (direction) => {
    if (productSliderRef.current) {
      productSliderRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="category-wise-section">

      {/* Section heading */}
      <div className="category-wise-header">
        <div className="category-wise-title-wrap">
          <span className="category-wise-eyebrow">
            DISCOVER MORE
          </span>
          <h2 className="category-wise-heading">
            {heading}
          </h2>
        </div>

        {!loading && data.length > 0 && (
          <div className="category-wise-arrows">
            <button
              type="button"
              onClick={() => scrollProducts('left')}
              className="category-wise-arrow"
              aria-label="Scroll products left"
            >
              <FaAngleLeft />
            </button>

            <button
              type="button"
              onClick={() => scrollProducts('right')}
              className="category-wise-arrow"
              aria-label="Scroll products right"
            >
              <FaAngleRight />
            </button>
          </div>
        )}
      </div>

      {/* Product slider */}
      <div
        className="category-wise-products"
        ref={productSliderRef}
      >
        {loading ? (
          loadingList.map((_, index) => (
            <div
              className="category-wise-card category-wise-skeleton-card"
              key={`product-skeleton-${index}`}
            >
              <div className="category-wise-skeleton-image" />

              <div className="category-wise-card-content">
                <div className="category-wise-skeleton-line skeleton-title" />
                <div className="category-wise-skeleton-line skeleton-category" />
                <div className="category-wise-skeleton-line skeleton-price" />
                <div className="category-wise-skeleton-button" />
              </div>
            </div>
          ))
        ) : data.length > 0 ? (
          data.map((product) => (
            <Link
              to={`/product/${product?._id}`}
              className="category-wise-card"
              key={product?._id}
              onClick={scrollTop}
            >
              {/* Product image */}
              <div className="category-wise-image-box">
                <span className="category-wise-product-badge">
                  GTSOU
                </span>

                <img
                  src={product?.productImage?.[0]}
                  alt={product?.productName || 'Product'}
                  className="category-wise-product-image"
                  loading="lazy"
                />
              </div>

              {/* Product details */}
              <div className="category-wise-card-content">
                <h3
                  className="category-wise-product-name"
                  title={product?.productName}
                >
                  {product?.productName}
                </h3>

                <p className="category-wise-category-name">
                  {product?.category}
                </p>

                <div className="category-wise-price-row">
                  <span className="category-wise-selling-price">
                    {displayINRCurrency(product?.sellingPrice)}
                  </span>

                  {Number(product?.price) > Number(product?.sellingPrice) && (
                    <span className="category-wise-original-price">
                      {displayINRCurrency(product?.price)}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="category-wise-cart-button"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="category-wise-empty">
            <div className="category-wise-empty-icon">🛍️</div>
            <h3>No Products Found</h3>
            <p>Is category mein abhi koi product available nahi hai.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CategroyWiseProductDisplay