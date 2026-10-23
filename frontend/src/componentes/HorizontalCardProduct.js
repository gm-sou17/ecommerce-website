import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCard'
import Context from '../context'
import './HorizontalCardProduct.css'

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadingList = new Array(6).fill(null)
  const scrollElement = useRef(null)

  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()

    await addToCart(e, id)
    await fetchUserAddToCart()
  }

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)

      try {
        const categoryProduct = await fetchCategoryWiseProduct(category)

        if (isMounted) {
          setData(categoryProduct?.data || [])
        }
      } catch (error) {
        console.error('Error fetching category products:', error)

        if (isMounted) {
          setData([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [category])

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({
        left: 330,
        behavior: 'smooth',
      })
    }
  }

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollBy({
        left: -330,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="horizontal-product-section">
      <h2 className="horizontal-product-heading">{heading}</h2>

      <div
        className="horizontal-product-slider"
        ref={scrollElement}
      >
        {loading ? (
          loadingList.map((_, index) => (
            <div
              className="horizontal-product-skeleton"
              key={`skeleton-${index}`}
            >
              <div className="horizontal-skeleton-image" />

              <div className="horizontal-skeleton-details">
                <div className="horizontal-skeleton-line" />
                <div className="horizontal-skeleton-line" />
                <div className="horizontal-skeleton-line" />
                <div className="horizontal-skeleton-button" />
              </div>
            </div>
          ))
        ) : data.length > 0 ? (
          data.map((product) => (
            <Link
              to={`/product/${product?._id}`}
              className="horizontal-product-card"
              key={product?._id}
            >
              <div className="horizontal-product-image-wrap">
                <img
                  src={product?.productImage?.[0]}
                  alt={product?.productName || 'Product'}
                  className="horizontal-product-image"
                  loading="lazy"
                />
              </div>

              <div className="horizontal-product-details">
                <div>
                  <h3 className="horizontal-product-name">
                    {product?.productName}
                  </h3>

                  <p className="horizontal-product-category">
                    {product?.category}
                  </p>

                  <div className="horizontal-product-prices">
                    <span className="horizontal-product-selling-price">
                      {displayINRCurrency(product?.sellingPrice)}
                    </span>

                    <span className="horizontal-product-original-price">
                      {displayINRCurrency(product?.price)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="horizontal-product-cart-btn"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div className="horizontal-product-empty">
            No products found in this category.
          </div>
        )}
      </div>

      {!loading && data.length > 1 && (
        <>
          <button
            type="button"
            className="horizontal-product-nav horizontal-product-nav-left"
            onClick={scrollLeft}
            aria-label="Scroll products left"
          >
            <FaAngleLeft />
          </button>

          <button
            type="button"
            className="horizontal-product-nav horizontal-product-nav-right"
            onClick={scrollRight}
            aria-label="Scroll products right"
          >
            <FaAngleRight />
          </button>
        </>
      )}
    </section>
  )
}

export default HorizontalCardProduct