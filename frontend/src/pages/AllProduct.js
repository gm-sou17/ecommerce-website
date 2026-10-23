import React, { useEffect, useState } from 'react'
import UploadProduct from '../componentes/uploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../componentes/AdminProductCard'
import './AllProducts.css'

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchAllProduct = async () => {
        try {
            setLoading(true)

            const response = await fetch(SummaryApi.allProduct.url)
            const dataResponse = await response.json()

            setAllProduct(dataResponse?.data || [])
        } catch (error) {
            console.error('Error fetching products:', error)
            setAllProduct([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <div className="all-products-page">

            {/* Page Header */}
            <div className="products-header">
                <div className="products-heading">
                    <span className="products-eyebrow">
                        GTSOU ADMIN PANEL
                    </span>

                    <h2>All Products</h2>

                    <p>Manage and organize your store products.</p>
                </div>

                <button
                    className="upload-product-btn"
                    onClick={() => setOpenUploadProduct(true)}
                >
                    <span className="upload-plus">+</span>
                    Upload Product
                </button>
            </div>

            {/* Product Stats */}
            <div className="products-stats">
                <div className="products-stat-card">
                    <div className="products-stat-icon">📦</div>

                    <div>
                        <p>Total Products</p>
                        <h3>{allProduct.length}</h3>
                    </div>
                </div>

                <div className="products-stat-card">
                    <div className="products-stat-icon">🛍️</div>

                    <div>
                        <p>Store Inventory</p>
                        <h3>
                            {loading ? '...' : allProduct.length === 0
                                ? 'Empty'
                                : 'Available'}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Product List Header */}
            <div className="products-list-header">
                <div>
                    <h3>Product Inventory</h3>
                    <p>Your uploaded products appear here.</p>
                </div>

                <span className="products-count">
                    {allProduct.length} Items
                </span>
            </div>

            {/* Product List */}
            <div className="admin-products-container">

                {loading ? (
                    <div className="products-message">
                        <div className="products-spinner"></div>
                        <p>Loading products...</p>
                    </div>
                ) : allProduct.length === 0 ? (
                    <div className="products-empty">
                        <div className="empty-product-icon">📦</div>

                        <h3>No Products Yet</h3>

                        <p>
                            Start building your inventory by uploading
                            your first product.
                        </p>

                        <button
                            className="upload-product-btn"
                            onClick={() => setOpenUploadProduct(true)}
                        >
                            + Add Your First Product
                        </button>
                    </div>
                ) : (
                    <div className="admin-products-grid">
                        {allProduct.map((product, index) => (
                            <div
                                className="admin-product-item"
                                key={product._id || index}
                            >
                                <AdminProductCard
                                    data={product}
                                    fetchdata={fetchAllProduct}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Product Modal */}
            {openUploadProduct && (
                <UploadProduct
                    onClose={() => setOpenUploadProduct(false)}
                    fetchData={fetchAllProduct}
                />
            )}

        </div>
    )
}

export default AllProducts