import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete, MdShoppingBag, MdLock, MdRefresh } from 'react-icons/md'
import { FaMinus, FaPlus, FaArrowRight, FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState('')
    const [deletingId, setDeletingId] = useState('')
    const context = useContext(Context)
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await fetch(SummaryApi.addToCartProductView.url, {
                method: SummaryApi.addToCartProductView.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            })

            const responseData = await response.json()

            if (responseData.success) {
                setData(responseData.data || [])
            }
        } catch (error) {
            console.error('Unable to fetch cart:', error)
        }
    }

    useEffect(() => {
        const loadCart = async () => {
            setLoading(true)
            await fetchData()
            setLoading(false)
        }

        loadCart()
    }, [])

    const updateQuantity = async (id, quantity) => {
        if (quantity < 1 || updatingId) return

        try {
            setUpdatingId(id)

            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                await fetchData()
                if (context?.fetchUserAddToCart) {
                    await context.fetchUserAddToCart()
                }
            }
        } catch (error) {
            console.error('Unable to update cart quantity:', error)
        } finally {
            setUpdatingId('')
        }
    }

    const increaseQty = (id, qty) => {
        updateQuantity(id, qty + 1)
    }

    const decreaseQty = (id, qty) => {
        if (qty > 1) {
            updateQuantity(id, qty - 1)
        }
    }

    const deleteCartProduct = async (id) => {
        if (deletingId) return

        try {
            setDeletingId(id)

            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ _id: id })
            })

            const responseData = await response.json()

            if (responseData.success) {
                await fetchData()

                if (context?.fetchUserAddToCart) {
                    await context.fetchUserAddToCart()
                }
            }
        } catch (error) {
            console.error('Unable to remove cart product:', error)
        } finally {
            setDeletingId('')
        }
    }

    const totalQty = data.reduce(
        (total, item) => total + Number(item?.quantity || 0),
        0
    )

    const totalPrice = data.reduce(
        (total, item) => total +
            Number(item?.quantity || 0) *
            Number(item?.productId?.sellingPrice || 0),
        0
    )

    return (
        <main className="gtsou-cart-page">
            <div className="gtsou-cart-container">

                {/* Cart Heading */}
                <div className="gtsou-cart-heading">
                    <div className="gtsou-cart-heading-icon">
                        <MdShoppingBag />
                    </div>

                    <div className="gtsou-cart-heading-content">
                        <h1>Shopping Cart</h1>
                        <p>
                            {loading
                                ? 'Loading your cart...'
                                : `${totalQty} item${totalQty === 1 ? '' : 's'} in your cart`}
                        </p>
                    </div>

                    <button
                        className="gtsou-cart-refresh"
                        onClick={async () => {
                            setLoading(true)
                            await fetchData()
                            setLoading(false)
                        }}
                        disabled={loading}
                        type="button"
                    >
                        <MdRefresh />
                        Refresh
                    </button>
                </div>

                <div className="gtsou-cart-layout">

                    {/* Cart Products */}
                    <section className="gtsou-cart-products">
                        <div className="gtsou-cart-section-heading">
                            <h2>Your Items</h2>
                            {!loading && (
                                <span>{data.length} product{data.length === 1 ? '' : 's'}</span>
                            )}
                        </div>

                        {loading ? (
                            <div className="gtsou-cart-loading-list">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        className="gtsou-cart-skeleton"
                                        key={item}
                                    />
                                ))}
                            </div>
                        ) : data.length > 0 ? (
                            <div className="gtsou-cart-items">
                                {data.map((product) => {
                                    const item = product?.productId
                                    const quantity = Number(product?.quantity || 1)
                                    const itemTotal = Number(item?.sellingPrice || 0) * quantity

                                    return (
                                        <article
                                            className="gtsou-cart-item"
                                            key={product?._id}
                                        >
                                            <button
                                                type="button"
                                                className="gtsou-cart-delete"
                                                aria-label={`Remove ${item?.productName || 'product'}`}
                                                title="Remove item"
                                                disabled={deletingId === product?._id}
                                                onClick={() => deleteCartProduct(product?._id)}
                                            >
                                                <MdDelete />
                                            </button>

                                            <button
                                                type="button"
                                                className="gtsou-cart-product-image"
                                                onClick={() => item?._id && navigate(`/product/${item._id}`)}
                                                aria-label={`View ${item?.productName || 'product'}`}
                                            >
                                                <img
                                                    src={item?.productImage?.[0]}
                                                    alt={item?.productName || 'Product'}
                                                />
                                            </button>

                                            <div className="gtsou-cart-product-info">
                                                <p className="gtsou-cart-category">
                                                    {item?.category || 'Product'}
                                                </p>

                                                <h3
                                                    className="gtsou-cart-product-name"
                                                    title={item?.productName}
                                                >
                                                    {item?.productName || 'Unnamed Product'}
                                                </h3>

                                                <div className="gtsou-cart-price-row">
                                                    <span className="gtsou-cart-unit-price">
                                                        {displayINRCurrency(item?.sellingPrice || 0)}
                                                        <small> / item</small>
                                                    </span>

                                                    <span className="gtsou-cart-item-total">
                                                        {displayINRCurrency(itemTotal)}
                                                    </span>
                                                </div>

                                                <div className="gtsou-cart-bottom-row">
                                                    <div className="gtsou-quantity-control">
                                                        <button
                                                            type="button"
                                                            aria-label="Decrease quantity"
                                                            disabled={quantity <= 1 || updatingId === product?._id}
                                                            onClick={() => decreaseQty(product?._id, quantity)}
                                                        >
                                                            <FaMinus />
                                                        </button>

                                                        <span className="gtsou-quantity-value">
                                                            {updatingId === product?._id
                                                                ? '...'
                                                                : quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            aria-label="Increase quantity"
                                                            disabled={updatingId === product?._id}
                                                            onClick={() => increaseQty(product?._id, quantity)}
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>

                                                    {deletingId === product?._id && (
                                                        <span className="gtsou-cart-removing">
                                                            Removing...
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="gtsou-cart-empty">
                                <div className="gtsou-cart-empty-icon">
                                    <FaShoppingCart />
                                </div>

                                <h2>Your cart is empty</h2>
                                <p>Looks like you haven't added anything to your cart yet.</p>

                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="gtsou-cart-shop-button"
                                >
                                    Continue Shopping
                                    <FaArrowRight />
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Order Summary */}
                    <aside className="gtsou-cart-summary">
                        <div className="gtsou-cart-summary-header">
                            <h2>Order Summary</h2>
                            <span>{totalQty} item{totalQty === 1 ? '' : 's'}</span>
                        </div>

                        {loading ? (
                            <div className="gtsou-cart-summary-loading">
                                <div className="gtsou-cart-skeleton" />
                                <div className="gtsou-cart-skeleton" />
                                <div className="gtsou-cart-skeleton" />
                            </div>
                        ) : (
                            <>
                                <div className="gtsou-summary-line">
                                    <span>Subtotal</span>
                                    <strong>{displayINRCurrency(totalPrice)}</strong>
                                </div>

                                <div className="gtsou-summary-line">
                                    <span>Quantity</span>
                                    <strong>{totalQty}</strong>
                                </div>

                                <div className="gtsou-summary-line">
                                    <span>Shipping</span>
                                    <strong className="gtsou-shipping-label">
                                        Calculated at checkout
                                    </strong>
                                </div>

                                <div className="gtsou-summary-divider" />

                                <div className="gtsou-summary-total">
                                    <span>Total</span>
                                    <strong>{displayINRCurrency(totalPrice)}</strong>
                                </div>

                                <button
                                    type="button"
                                    className="gtsou-cart-checkout-button"
                                    disabled={data.length === 0}
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed to Checkout
                                    <FaArrowRight />
                                </button>

                                <button
                                    type="button"
                                    className="gtsou-cart-continue-button"
                                    onClick={() => navigate('/')}
                                >
                                    Continue Shopping
                                </button>
                            </>
                        )}

                        <div className="gtsou-cart-security-note">
                            <MdLock />
                            <span>Secure shopping experience</span>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default Cart