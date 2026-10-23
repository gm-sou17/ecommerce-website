
import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from 'react-icons/gr'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { FiMoon, FiSun } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/role'
import Context from '../context'
import './Header.css'

const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const context = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const isCartPage = location.pathname === '/cart'
    const isDarkTheme = context?.theme === 'dark'

    const [menuDisplay, setMenuDisplay] = useState(false)

    const [search, setSearch] = useState(
        new URLSearchParams(location.search).get('q') || ''
    )

    // URL change hone par search input update hoga
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        setSearch(params.get('q') || '')
    }, [location.search])

    // Logout Function
    const handleLogout = async () => {
        try {
            const response = await fetch(SummaryApi.logout_user.url, {
                method: SummaryApi.logout_user.method,
                credentials: 'include'
            })

            const data = await response.json()

            if (data.success) {
                toast.success(data.message)
                dispatch(setUserDetails(null))
                setMenuDisplay(false)
                navigate('/')
            } else {
                toast.error(data.message || 'Logout failed')
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
        }
    }

    // Search Function
    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)

        if (value.trim()) {
            navigate(`/search?q=${encodeURIComponent(value)}`)
        } else {
            navigate('/search')
        }
    }

    // Search button click
    const handleSearchSubmit = (e) => {
        e.preventDefault()

        if (search.trim()) {
            navigate(`/search?q=${encodeURIComponent(search.trim())}`)
        } else {
            navigate('/search')
        }
    }

    return (
        <>
            <header className={`shop-header ${isCartPage ? 'shop-header-no-search' : ''}`}>
                <div className="shop-header-inner">

                    {/* Logo */}
                    <Link to="/" className="shop-logo">
                        <Logo w={90} h={50} />
                    </Link>

                    {/* Desktop Search */}
                    {!isCartPage && <form
                        className="shop-search desktop-search"
                        onSubmit={handleSearchSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Search products, brands..."
                            value={search}
                            onChange={handleSearch}
                            aria-label="Search products"
                        />

                        <button
                            type="submit"
                            className="shop-search-button"
                            aria-label="Search"
                        >
                            <GrSearch />
                        </button>
                    </form>}

                    {/* Header Actions */}
                    <div className="shop-header-actions">
                        <button
                            type="button"
                            className="shop-theme-toggle"
                            onClick={context?.toggleTheme}
                            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
                            title={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
                        >
                            {isDarkTheme ? <FiSun /> : <FiMoon />}
                        </button>

                        {/* User Profile */}
                        {user?._id && (
                            <div className="shop-profile">
                                <button
                                    type="button"
                                    className="shop-profile-button"
                                    onClick={() =>
                                        setMenuDisplay(prev => !prev)
                                    }
                                    aria-label="Open profile menu"
                                    aria-expanded={menuDisplay}
                                >
                                    {user?.profilePic ? (
                                        <img
                                            src={user.profilePic}
                                            alt={user?.name || 'Profile'}
                                        />
                                    ) : (
                                        <FaRegCircleUser />
                                    )}
                                </button>

                                {menuDisplay && (
                                    <>
                                        <button
                                            type="button"
                                            className="shop-menu-backdrop"
                                            aria-label="Close profile menu"
                                            onClick={() =>
                                                setMenuDisplay(false)
                                            }
                                        />

                                        <div className="shop-profile-menu">
                                            <div className="shop-profile-info">
                                                <p className="shop-profile-name">
                                                    {user?.name || 'My Account'}
                                                </p>

                                                <p className="shop-profile-role">
                                                    {user?.role || 'Customer'}
                                                </p>
                                            </div>

                                            {user?.role === ROLE.ADMIN && (
                                                <Link
                                                    to="/admin-panel/all-products"
                                                    onClick={() =>
                                                        setMenuDisplay(false)
                                                    }
                                                >
                                                    Admin Panel
                                                </Link>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Shopping Cart */}
                        {user?._id && (
                            <Link
                                to="/cart"
                                className="shop-cart"
                                aria-label="Shopping cart"
                            >
                                <FaShoppingCart />

                                <span className="shop-cart-count">
                                    {context?.cartProductCount ?? 0}
                                </span>
                            </Link>
                        )}

                        {/* Login / Logout */}
                        <div className="shop-auth">
                            {user?._id ? (
                                <button
                                    onClick={handleLogout}
                                    className="shop-auth-button"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="shop-auth-button"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                {!isCartPage && <div className="shop-mobile-search">
                    <form
                        className="shop-search"
                        onSubmit={handleSearchSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={handleSearch}
                            aria-label="Search products"
                        />

                        <button
                            type="submit"
                            className="shop-search-button"
                            aria-label="Search"
                        >
                            <GrSearch />
                        </button>
                    </form>
                </div>}
            </header>

            {/* Fixed Header Spacing */}
            <div className="shop-header-spacer" />
        </>
    )
}

export default Header
