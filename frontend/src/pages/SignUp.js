import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash, FaCamera, FaUser, FaEnvelope, FaLock, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { imageTobase64 } from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import './SignUp.css'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error("Please select a valid image")
            e.target.value = ''
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB")
            e.target.value = ''
            return
        }

        try {
            const imagePic = await imageTobase64(file)

            setData((prev) => ({
                ...prev,
                profilePic: imagePic
            }))
        } catch {
            toast.error("Unable to upload image")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        if (data.password !== data.confirmPassword) {
            toast.error("Please check password and confirm password")
            return
        }

        setLoading(true)

        try {
            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            } else if (dataApi.error) {
                toast.error(dataApi.message)
            } else {
                toast.error("Unable to create account. Please try again.")
            }
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="signup" className="signup-page">

            <div className="signup-bg-shape shape-one"></div>
            <div className="signup-bg-shape shape-two"></div>
            <div className="signup-grid"></div>

            <div className="signup-container">

                {/* LEFT BRAND PANEL */}

                <aside className="signup-visual">

                    <Link to="/" className="signup-brand">
                        <span className="signup-brand-icon">S</span>
                        <span>SHOP<span className="brand-blue">ZONE</span></span>
                    </Link>

                    <div className="signup-visual-content">

                        <div className="visual-badge">
                            <FaCheckCircle />
                            YOUR NEXT CHAPTER STARTS HERE
                        </div>

                        <h1>
                            Good things<br />
                            begin with<br />
                            <span>you.</span>
                        </h1>

                        <p className="signup-visual-description">
                            Create your account and discover a simpler,
                            smarter way to shop for everything you love.
                        </p>

                        <div className="signup-benefits">

                            <div className="benefit-item">
                                <span className="benefit-check">
                                    <FaCheckCircle />
                                </span>
                                <span>Personalized shopping experience</span>
                            </div>

                            <div className="benefit-item">
                                <span className="benefit-check">
                                    <FaCheckCircle />
                                </span>
                                <span>Manage your orders with ease</span>
                            </div>

                            <div className="benefit-item">
                                <span className="benefit-check">
                                    <FaCheckCircle />
                                </span>
                                <span>Everything in one place</span>
                            </div>

                        </div>

                        <div className="signup-decoration">
                            <div className="decoration-circle circle-one"></div>
                            <div className="decoration-circle circle-two"></div>
                            <div className="decoration-center">S</div>
                        </div>

                    </div>

                    <div className="signup-visual-footer">
                        <span>MADE FOR EVERYDAY LIVING</span>
                        <span>© 2026 SHOPZONE</span>
                    </div>

                </aside>

                {/* SIGNUP FORM */}

                <main className="signup-form-panel">

                    <div className="signup-topbar">
                        <div className="signup-mobile-brand">
                            <span className="signup-brand-icon">S</span>
                            <span>SHOP<span className="brand-blue">ZONE</span></span>
                        </div>

                        <p>
                            Already a member?
                            <Link to="/login"> Sign in ↗</Link>
                        </p>
                    </div>

                    <div className="signup-form-content">

                        <div className="signup-heading">
                            <div className="signup-step-label">
                                <span></span> CREATE YOUR ACCOUNT
                            </div>

                            <h2>Let's get you<br />
                                <span>started.</span>
                            </h2>

                            <p>
                                Fill in your details to join our community.
                            </p>
                        </div>

                        {/* PROFILE PHOTO */}

                        <div className="signup-avatar-section">

                            <div className="signup-avatar-wrap">

                                <img
                                    src={data.profilePic || loginIcons}
                                    alt="Profile preview"
                                    className="signup-avatar"
                                />

                                <label
                                    htmlFor="profile-upload"
                                    className="signup-avatar-upload"
                                    title="Upload profile photo"
                                >
                                    <FaCamera />
                                </label>

                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    className="signup-file-input"
                                    onChange={handleUploadPic}
                                />

                            </div>

                            <div className="signup-avatar-info">
                                <p>Profile photo</p>
                                <span>Personalize your account · Max 5MB</span>
                            </div>

                        </div>

                        <form className="signup-form" onSubmit={handleSubmit}>

                            {/* NAME */}

                            <div className="signup-field">
                                <label htmlFor="signup-name">Full name</label>

                                <div className="signup-input-wrap">
                                    <FaUser className="signup-input-icon" />

                                    <input
                                        id="signup-name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleOnChange}
                                        autoComplete="name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}

                            <div className="signup-field">
                                <label htmlFor="signup-email">Email address</label>

                                <div className="signup-input-wrap">
                                    <FaEnvelope className="signup-input-icon" />

                                    <input
                                        id="signup-email"
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

                            {/* PASSWORD */}

                            <div className="signup-field">
                                <label htmlFor="signup-password">Password</label>

                                <div className="signup-input-wrap">
                                    <FaLock className="signup-input-icon" />

                                    <input
                                        id="signup-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        name="password"
                                        value={data.password}
                                        onChange={handleOnChange}
                                        autoComplete="new-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="signup-password-toggle"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>

                            {/* CONFIRM PASSWORD */}

                            <div className="signup-field">
                                <label htmlFor="signup-confirm-password">
                                    Confirm password
                                </label>

                                <div className="signup-input-wrap">
                                    <FaLock className="signup-input-icon" />

                                    <input
                                        id="signup-confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Re-enter your password"
                                        name="confirmPassword"
                                        value={data.confirmPassword}
                                        onChange={handleOnChange}
                                        autoComplete="new-password"
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="signup-password-toggle"
                                        onClick={() => setShowConfirmPassword(prev => !prev)}
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {data.confirmPassword && (
                                    <p className={`signup-password-hint ${
                                        data.password === data.confirmPassword
                                            ? 'password-match'
                                            : 'password-mismatch'
                                    }`}>
                                        {data.password === data.confirmPassword
                                            ? '✓ Passwords match'
                                            : 'Passwords do not match'}
                                    </p>
                                )}
                            </div>

                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="signup-submit-btn"
                                disabled={loading}
                            >
                                <span>
                                    {loading ? "Creating account..." : "Create my account"}
                                </span>

                                {!loading && <FaArrowRight />}

                                {loading && <span className="signup-spinner"></span>}
                            </button>

                        </form>

                        <div className="signup-terms">
                            <FaLock />
                            <p>
                                Your information is used to create and manage
                                your account.
                            </p>
                        </div>

                        <p className="signup-mobile-login">
                            Already have an account?
                            <Link to="/login"> Sign in</Link>
                        </p>

                    </div>

                    <footer className="signup-form-footer">
                        <span>© 2026 SHOPZONE</span>
                        <span>BUILT AROUND YOU</span>
                    </footer>

                </main>

            </div>

        </section>
    )
}

export default SignUp
