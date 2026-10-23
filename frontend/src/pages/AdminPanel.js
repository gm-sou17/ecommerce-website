import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import ROLE from '../common/role';
import './AdminPanel.css'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user, navigate])

    return (
        <div className="admin-dashboard md:flex hidden">

            <aside className="admin-sidebar">

                <div className="admin-brand">
                    <div className="brand-icon">✦</div>
                    <div>
                        <h2>GT<span>Sou</span></h2>
                        <p>MANAGEMENT SYSTEM</p>
                    </div>
                </div>

                <div className="admin-profile">
                    <div className="profile-avatar">
                        {user?.profilePic ? (
                            <img src={user?.profilePic} alt={user?.name} />
                        ) : (
                            <FaRegCircleUser />
                        )}
                        <span className="online-indicator"></span>
                    </div>

                    <h3>{user?.name}</h3>
                    <p className="profile-role">{user?.role}</p>
                    <div className="profile-status">
                        <span></span> Online
                    </div>
                </div>

                <div className="nav-heading">WORKSPACE</div>

                <nav className="admin-nav">
                    <Link
                        to="all-users"
                        className={`admin-nav-link ${
                            location.pathname.endsWith('/all-users')
                                ? 'active'
                                : ''
                        }`}
                    >
                        <span className="nav-icon">♙</span>
                        <span>All Users</span>
                        <span className="nav-arrow">›</span>
                    </Link>

                    <Link
                        to="all-products"
                        className={`admin-nav-link ${
                            location.pathname.endsWith('/all-products')
                                ? 'active'
                                : ''
                        }`}
                    >
                        <span className="nav-icon">▦</span>
                        <span>All Products</span>
                        <span className="nav-arrow">›</span>
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <div className="footer-orb"></div>
                    <p>YOUR WORKSPACE</p>
                    <h4>Everything in control.</h4>
                    <span>Manage smarter. Work faster.</span>
                </div>

                <div className="sidebar-bottom">
                    <span className="bottom-dot"></span>
                    SYSTEM OPERATIONAL
                </div>

            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <div>
                        <p className="topbar-eyebrow">CONTROL CENTER / 2026</p>
                        <h1>
                            Welcome back,
                            <span> {user?.name?.split(' ')[0] || 'Admin'}</span>
                        </h1>
                        <p className="topbar-subtitle">
                            Manage your workspace with precision.
                        </p>
                    </div>

                    <div className="topbar-right">
                        <div className="live-badge">
                            <span></span> LIVE DASHBOARD
                        </div>
                        <div className="topbar-avatar">
                            {user?.profilePic ? (
                                <img src={user.profilePic} alt={user?.name} />
                            ) : (
                                <FaRegCircleUser />
                            )}
                        </div>
                    </div>
                </header>

                <section className="dashboard-welcome">
                    <div className="welcome-content">
                        <div className="welcome-tag">
                            <span>✦</span> ADMINISTRATOR ACCESS
                        </div>
                        <h2>Your command center.</h2>
                        <p>
                            Your users, your products, your entire workspace —
                            all in one place.
                        </p>
                        <div className="welcome-line">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div className="welcome-visual">
                        <div className="visual-ring ring-one"></div>
                        <div className="visual-ring ring-two"></div>
                        <div className="visual-core">✦</div>
                        <div className="visual-orbit orbit-one"></div>
                        <div className="visual-orbit orbit-two"></div>
                    </div>
                </section>

                <section className="quick-access">
                    <div className="section-heading">
                        <div>
                            <p>YOUR WORKSPACE</p>
                            <h2>Quick Access</h2>
                        </div>
                        <span className="section-label">SELECT A MODULE ↘</span>
                    </div>

                    <div className="access-grid">

                        <Link to="all-users" className="access-card users-card">
                            <div className="card-top">
                                <span className="access-icon">♙</span>
                                <span className="card-arrow">↗</span>
                            </div>
                            <div>
                                <p className="card-label">MANAGEMENT MODULE 01</p>
                                <h3>All Users</h3>
                                <p className="card-description">
                                    Access and manage user accounts.
                                </p>
                            </div>
                            <div className="card-bottom">
                                <span>OPEN MODULE</span>
                                <span>⟶</span>
                            </div>
                        </Link>

                        <Link to="all-products" className="access-card products-card">
                            <div className="card-top">
                                <span className="access-icon">▦</span>
                                <span className="card-arrow">↗</span>
                            </div>
                            <div>
                                <p className="card-label">MANAGEMENT MODULE 02</p>
                                <h3>All Products</h3>
                                <p className="card-description">
                                    Explore and manage your products.
                                </p>
                            </div>
                            <div className="card-bottom">
                                <span>OPEN MODULE</span>
                                <span>⟶</span>
                            </div>
                        </Link>

                    </div>
                </section>

                <div className="admin-content">
                    <Outlet />
                </div>

                <footer className="admin-footer">
                    <span>ADMINHUB © 2026</span>
                    <span><i></i> ALL SYSTEMS NORMAL</span>
                </footer>

            </main>

        </div>
    )
}

export default AdminPanel