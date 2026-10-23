import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalfAlt, FaShoppingCart, FaBolt } from 'react-icons/fa'
import { MdVerified, MdLocalShipping, MdReplay } from 'react-icons/md'
import displayINRCurrency from '../helpers/displayCurrency'
import CategroyWiseProductDisplay from '../componentes/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCard'
import Context from '../context'
import { toast } from 'react-toastify'
import './ProductDetails.css'

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        sellingPrice: ''
    })

    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState('')
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })
    const [zoomImage, setZoomImage] = useState(false)
    const [addingToCart, setAddingToCart] = useState(false)
    const [buying, setBuying] = useState(false)

    const params = useParams()
    const navigate = useNavigate()
    const { fetchUserAddToCart } = useContext(Context)

    const fetchProductDetails = useCallback(async () => {
        try {
            setLoading(true)

            const response = await fetch(SummaryApi.productDetails.url, {
                method: SummaryApi.productDetails.method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    productId: params?.id
                })
            })

            const responseData = await response.json()

            if (responseData?.success && responseData?.data) {
                const product = responseData.data
                setData(product)
                setActiveImage(product?.productImage?.[0] || '')
            } else {
                toast.error(responseData?.message || 'Product details nahi mil sake.')
            }
        } catch (error) {
            toast.error('Product load nahi ho paaya. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [params?.id])

    useEffect(() => {
        fetchProductDetails()
    }, [fetchProductDetails])

    const handleZoomImage = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height

        setZoomImageCoordinate({ x, y })
        setZoomImage(true)
    }, [])

    const handleAddToCart = async (e, id) => {
        if (!id || addingToCart) return

        try {
            setAddingToCart(true)
            await addToCart(e, id)
            await fetchUserAddToCart()
        } finally {
            setAddingToCart(false)
        }
    }

    const handleBuyProduct = async (e, id) => {
        if (!id || buying) return

        try {
            setBuying(true)
            await addToCart(e, id)
            await fetchUserAddToCart()
            navigate('/cart')
        } finally {
            setBuying(false)
        }
    }

    const discount = data?.price && data?.sellingPrice && Number(data.price) > 0
        ? Math.round(((Number(data.price) - Number(data.sellingPrice)) / Number(data.price)) * 100)
        : 0

    return (
        <main className="product-details-page">
            <div className="product-details-container">

                <div className="product-details-breadcrumb">
                    <span onClick={() => navigate('/')}>Home</span>
                    <span className="breadcrumb-divider">/</span>
                    <span>{data?.category || 'Products'}</span>
                    <span className="breadcrumb-divider">/</span>
                    <span className="breadcrumb-current">
                        {data?.productName || 'Product Details'}
                    </span>
                </div>

                <section className="product-details-layout">

                    {/* Product Image Gallery */}
                    <div className="product-gallery">
                        <div className="product-thumbnail-list">
                            {loading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        className="product-thumbnail skeleton"
                                        key={index}
                                    />
                                ))
                            ) : (
                                data?.productImage?.map((imgURL, index) => (
                                    <button
                                        type="button"
                                        className={`product-thumbnail ${
                                            activeImage === imgURL ? 'active-thumbnail' : ''
                                        }`}
                                        key={`${imgURL}-${index}`}
                                        onMouseEnter={() => setActiveImage(imgURL)}
                                        onClick={() => setActiveImage(imgURL)}
                                        aria-label={`View product image ${index + 1}`}
                                    >
                                        <img src={imgURL} alt={`${data?.productName} ${index + 1}`} />
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="product-main-image-wrap">
                            {loading ? (
                                <div className="product-main-image skeleton" />
                            ) : activeImage ? (
                                <>
                                    {discount > 0 && (
                                        <span className="product-discount-badge">
                                            {discount}% OFF
                                        </span>
                                    )}

                                    <div className="product-main-image">
                                        <img
                                            src={activeImage}
                                            alt={data?.productName || 'Product'}
                                            onMouseMove={handleZoomImage}
                                            onMouseLeave={() => setZoomImage(false)}
                                        />
                                    </div>

                                    {zoomImage && (
                                        <div
                                            className="product-image-zoom"
                                            aria-hidden="true"
                                            style={{
                                                backgroundImage: `url("${activeImage}")`,
                                                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                            }}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="product-image-unavailable">
                                    Product image unavailable
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="product-info-panel">
                        {loading ? (
                            <div className="product-info-skeleton">
                                <div className="skeleton skeleton-line short-line" />
                                <div className="skeleton skeleton-line title-line" />
                                <div className="skeleton skeleton-line medium-line" />
                                <div className="skeleton skeleton-line price-line" />
                                <div className="skeleton skeleton-line description-line" />
                                <div className="skeleton skeleton-button-row" />
                            </div>
                        ) : (
                            <>
                                <div className="product-brand-row">
                                    <span className="product-brand-badge">
                                        {data?.brandName || 'GTSOU'}
                                    </span>
                                    <span className="product-stock-badge">
                                        <MdVerified />
                                        Product Details
                                    </span>
                                </div>

                                <h1 className="product-details-title">
                                    {data?.productName}
                                </h1>

                                <p className="product-category-label">
                                    Category: <span>{data?.category}</span>
                                </p>

                                <div className="product-rating-row">
                                    <div className="product-rating-stars">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalfAlt />
                                    </div>
                                    <span className="product-rating-text">
                                        Customer favourite
                                    </span>
                                </div>

                                <div className="product-price-section">
                                    <div className="product-price-row">
                                        <span className="product-selling-price">
                                            {displayINRCurrency(data?.sellingPrice)}
                                        </span>

                                        {Number(data?.price) > Number(data?.sellingPrice) && (
                                            <span className="product-original-price">
                                                {displayINRCurrency(data?.price)}
                                            </span>
                                        )}
                                    </div>

                                    {discount > 0 && (
                                        <p className="product-savings-text">
                                            You save {displayINRCurrency(
                                                Number(data.price) - Number(data.sellingPrice)
                                            )} ({discount}% off)
                                        </p>
                                    )}

                                    <p className="product-tax-note">
                                        Final price as displayed
                                    </p>
                                </div>

                                <div className="product-action-buttons">
                                    <button
                                        type="button"
                                        className="product-buy-button"
                                        onClick={(e) => handleBuyProduct(e, data?._id)}
                                        disabled={buying || addingToCart || !data?._id}
                                    >
                                        <FaBolt />
                                        {buying ? 'Processing...' : 'Buy Now'}
                                    </button>

                                    <button
                                        type="button"
                                        className="product-cart-button"
                                        onClick={(e) => handleAddToCart(e, data?._id)}
                                        disabled={addingToCart || buying || !data?._id}
                                    >
                                        <FaShoppingCart />
                                        {addingToCart ? 'Adding...' : 'Add to Cart'}
                                    </button>
                                </div>

                                <div className="product-service-features">
                                    <div className="product-service-item">
                                        <span className="product-service-icon">
                                            <MdLocalShipping />
                                        </span>
                                        <div>
                                            <h4>Easy Shopping</h4>
                                            <p>Convenient online ordering</p>
                                        </div>
                                    </div>

                                    <div className="product-service-item">
                                        <span className="product-service-icon">
                                            <MdReplay />
                                        </span>
                                        <div>
                                            <h4>Customer Support</h4>
                                            <p>We're here to help</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="product-description-section">
                                    <h3>Product Description</h3>
                                    <p>
                                        {data?.description || 'No description available for this product.'}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Recommended Products */}
                {!loading && data?.category && (
                    <section className="product-recommendations">
                        <div className="product-recommendations-heading">
                            <span className="recommendations-eyebrow">HANDPICKED FOR YOU</span>
                            <h2>Recommended Products</h2>
                            <p>Explore more products from the same category.</p>
                        </div>

                        <CategroyWiseProductDisplay
                            category={data.category}
                            heading="Recommended Product"
                        />
                    </section>
                )}
            </div>
        </main>
    )
}

export default ProductDetails