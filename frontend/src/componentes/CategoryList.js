import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import './CategoryList.css'

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true)

      const response = await fetch(SummaryApi.categoryProduct.url)
      const dataResponse = await response.json()

      if (dataResponse?.data) {
        setCategoryProduct(dataResponse.data)
      }
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  return (
    <section className="category-list-section">
      <div className="category-list-container">

        <div className="category-list-heading">
          <div>
            <span className="category-list-eyebrow">
              EXPLORE OUR STORE
            </span>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="category-list-scroll">

          {loading ? (
            categoryLoading.map((_, index) => (
              <div
                className="category-list-item category-loading-item"
                key={`categoryLoading${index}`}
              >
                <div className="category-list-image category-skeleton" />
                <div className="category-skeleton-text" />
              </div>
            ))
          ) : (
            categoryProduct.map((product) => (
              <Link
                to={`/product-category?category=${encodeURIComponent(product?.category || '')}`}
                className="category-list-item"
                key={product?.category}
              >
                <div className="category-list-image">
                  <img
                    src={product?.productImage?.[0]}
                    alt={product?.category || 'Product category'}
                    loading="lazy"
                  />
                </div>

                <p className="category-list-name">
                  {product?.category}
                </p>
              </Link>
            ))
          )}

          {!loading && categoryProduct.length === 0 && (
            <p className="category-list-empty">
              No categories available right now.
            </p>
          )}

        </div>
      </div>
    </section>
  )
}

export default CategoryList