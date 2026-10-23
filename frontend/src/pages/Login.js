
import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import './Login.css'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        setLoading(true)

        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate('/')
                fetchUserDetails()
                fetchUserAddToCart()
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="login" className="login-page">

            <div className="login-glow login-glow-one"></div>
            <div className="login-glow login-glow-two"></div>
            <div className="login-grid-bg"></div>

            <div className="login-container">

                {/* LEFT SIDE */}

                <div className="login-visual">

                    <div className="visual-top-tag">
                        <span className="visual-live-dot"></span>
                        YOUR SPACE. YOUR EXPERIENCE.
                    </div>

                    <div className="visual-content">
                        <div className="login-image-wrap">
                            <div className="image-ring image-ring-one"></div>
                            <div className="image-ring image-ring-two"></div>

                            <div className="login-image-card">
                                <img src={loginIcons} alt="Welcome login illustration" />
                            </div>

                            <span className="floating-star star-one">✦</span>
                            <span className="floating-star star-two">✧</span>
                            <span className="floating-orb orb-one"></span>
                            <span className="floating-orb orb-two"></span>
                        </div>

                        <h1>
                            Welcome<br />
                            <span>back.</span>
                        </h1>

                        <p className="visual-description">
                            Your world is just one step away.
                            Sign in to continue your journey.
                        </p>

                        <div className="visual-indicators">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className="visual-footer">
                        <span>SECURE ACCESS</span>
                        <span>✦</span>
                        <span>MADE FOR YOU</span>
                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="login-form-side">

                    <div className="login-form-top">
                        <div className="login-brand">
                            <span className="login-brand-icon">✦</span>
                            <span>GTSOU</span>
                        </div>

                        <p>
                            New here?
                            <Link to="/sign-up"> Create account ↗</Link>
                        </p>
                    </div>

                    <div className="login-form-content">

                        <div className="form-heading">
                            <div className="form-eyebrow">
                                <span></span> MEMBER ACCESS
                            </div>

                            <h2>Sign in to your<br />
                                <span>account.</span>
                            </h2>

                            <p>Enter your details below to get started.</p>
                        </div>

                        <form className="login-form" onSubmit={handleSubmit}>

                            <div className="login-field">
                                <label htmlFor="login-email">Email address</label>

                                <div className="login-input-wrap">
                                    <span className="input-icon">✉</span>

                                    <input
                                        id="login-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        name="email"
                                        value={data.email}
                                        onChange={handleOnChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="login-field">
                                <div className="password-label-row">
                                    <label htmlFor="login-password">Password</label>

                                    <Link to="/forgot-password">
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="login-input-wrap">
                                    <span className="input-icon">♙</span>

                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={data.password}
                                        name="password"
                                        onChange={handleOnChange}
                                        autoComplete="current-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="login-submit-btn"
                            >
                                <span>
                                    {loading ? "Signing you in..." : "Sign in to account"}
                                </span>
                                {!loading && <span className="submit-arrow">↗</span>}
                                {loading && <span className="login-spinner"></span>}
                            </button>

                        </form>

                        <button
                            type="button"
                            className="login-google-btn"
                            onClick={() => toast.info('Google sign-in is not configured yet.')}
                        >
                            <FcGoogle />
                            Continue with Google
                        </button>

                        <div className="login-divider">
                            <span></span>
                            <p>OR SIGN IN WITH EMAIL</p>
                            <span></span>
                        </div>

                        <div className="login-security-note">
                            <span className="security-icon">✓</span>
                            <p>
                                Your information is protected.
                                <span> Sign in securely to continue.</span>
                            </p>
                        </div>

                        <p className="login-mobile-signup">
                            Don't have an account?
                            <Link to="/sign-up"> Sign up</Link>
                        </p>

                    </div>

                    <div className="login-bottom-note">
                        <span>© 2026 GTSOU</span>
                        <span>DESIGNED FOR A BETTER EXPERIENCE</span>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Login
