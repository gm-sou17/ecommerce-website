import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCard'
import Context from '../context'
import './VerticalCardProduct.css'

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollElement = useRef(null)

  const { fetchUserAddToCart } = useContext(Context)

  const loadingList = new Array(8).fill(null)

  const fetchData = async () => {
    setLoading(true)

    try {
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setData(categoryProduct?.data || [])
    } catch (error) {
      console.error('Error fetching category products:', error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [category])

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()

    await addToCart(e, id)
    await fetchUserAddToCart()
  }

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({
        left: 320,
        behavior: 'smooth',
      })
    }
  }

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({
        left: -320,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="vcp-section">
      <div className="vcp-heading-row">
        <div className="vcp-heading-content">
          <span className="vcp-eyebrow">CURATED FOR YOU</span>
          <h2 className="vcp-heading">{heading}</h2>
          <p className="vcp-subheading">
            Explore our handpicked products just for you.
          </p>
        </div>

        <div className="vcp-navigation">
          <button
            type="button"
            className="vcp-nav-btn"
            onClick={scrollLeft}
            aria-label="Scroll products left"
          >
            <FaAngleLeft />
          </button>

          <button
            type="button"
            className="vcp-nav-btn"
            onClick={scrollRight}
            aria-label="Scroll products right"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <div className="vcp-slider-wrap">
        <div className="vcp-slider" ref={scrollElement}>
          {loading ? (
            loadingList.map((_, index) => (
              <div className="vcp-card vcp-skeleton-card" key={index}>
                <div className="vcp-skeleton-image" />

                <div className="vcp-card-content">
                  <div className="vcp-skeleton-line vcp-line-title" />
                  <div className="vcp-skeleton-line vcp-line-category" />

                  <div className="vcp-skeleton-price-row">
                    <div className="vcp-skeleton-line vcp-line-price" />
                    <div className="vcp-skeleton-line vcp-line-old-price" />
                  </div>

                  <div className="vcp-skeleton-button" />
                </div>
              </div>
            ))
          ) : data.length > 0 ? (
            data.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                className="vcp-card"
                key={product?._id}
              >
                <div className="vcp-image-wrap">
                  <span className="vcp-product-badge">Featured</span>

                  <img
                    src={product?.productImage?.[0]}
                    alt={product?.productName || 'Product'}
                    className="vcp-product-image"
                    loading="lazy"
                  />
                </div>

                <div className="vcp-card-content">
                  <p className="vcp-category">
                    {product?.category}
                  </p>

                  <h3 className="vcp-product-name">
                    {product?.productName}
                  </h3>

                  <div className="vcp-price-row">
                    <span className="vcp-selling-price">
                      {displayINRCurrency(product?.sellingPrice)}
                    </span>

                    <span className="vcp-original-price">
                      {displayINRCurrency(product?.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="vcp-cart-btn"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                    <span className="vcp-cart-arrow">+</span>
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <div className="vcp-empty-state">
              <div className="vcp-empty-icon">✦</div>
              <h3>No products found</h3>
              <p>There are no products available in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VerticalCardProduct
