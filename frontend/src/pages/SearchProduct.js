import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../componentes/VerticalCard'
import { FaSearch, FaBoxOpen } from 'react-icons/fa'
import './SearchProduct.css'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        const fetchProduct = async () => {
            try {
                setLoading(true)

                const response = await fetch(
                    SummaryApi.searchProduct.url + query.search,
                    { signal: controller.signal }
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const dataResponse = await response.json()
                setData(
                    Array.isArray(dataResponse.data)
                        ? dataResponse.data
                        : []
                )
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Search error:', error)
                    setData([])
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchProduct()

        return () => controller.abort()
    }, [query.search])

    return (
        <div className="search-page">
            <div className="search-container">

                {/* Search Header */}
                <div className="search-header">
                    <div className="search-heading-icon">
                        <FaSearch />
                    </div>

                    <div className="search-heading-content">
                        <span className="search-subtitle">
                            FIND YOUR FAVOURITES
                        </span>

                        <h1>
                            Search <span>Products</span>
                        </h1>

                        <p>
                            Discover amazing products made for you.
                        </p>
                    </div>
                </div>

                {/* Results Count */}
                <div className="search-results-bar">
                    <div>
                        <h2>Search Results</h2>

                        <p>
                            {loading
                                ? 'Searching products...'
                                : `We found ${data.length} ${
                                    data.length === 1
                                        ? 'product'
                                        : 'products'
                                } for you`}
                        </p>
                    </div>

                    {!loading && (
                        <div className="search-count">
                            {data.length} ITEMS
                        </div>
                    )}
                </div>

                {/* Loading Animation */}
                {loading && (
                    <div className="search-loading">
                        <div className="search-spinner"></div>

                        <h3>Finding your products</h3>

                        <p>Please wait while we explore our collection.</p>
                    </div>
                )}

                {/* No Products Found */}
                {!loading && data.length === 0 && (
                    <div className="search-empty">
                        <div className="empty-icon">
                            <FaBoxOpen />
                        </div>

                        <h2>No Products Found!</h2>

                        <p>
                            Oops! We couldn't find any matching products.
                            Try searching with a different keyword.
                        </p>

                        <div className="empty-search-icon">
                            <FaSearch />
                            <span>Try another search</span>
                        </div>
                    </div>
                )}

                {/* Product Cards */}
                {!loading && data.length > 0 && (
                    <div className="search-product-wrapper">
                        <VerticalCard
                            loading={loading}
                            data={data}
                        />
                    </div>
                )}

            </div>
        </div>
    )
}

export default SearchProduct
