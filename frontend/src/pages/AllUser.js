import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit, MdPeopleAlt, MdRefresh } from 'react-icons/md'
import { FaUsers, FaUserShield } from 'react-icons/fa'
import ChangeUserRole from '../componentes/ChangeUserRole'
import './AllUser.css'

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [loading, setLoading] = useState(true)

    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: '',
        name: '',
        role: '',
        _id: ''
    })

    const fetchAllUsers = async () => {
        try {
            setLoading(true)

            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            })

            const dataResponse = await fetchData.json()

            if (dataResponse.success) {
                setAllUsers(dataResponse.data || [])
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message)
            }
        } catch (error) {
            toast.error('Users load nahi ho paaye. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const adminCount = allUser.filter(
        user => user?.role?.toLowerCase() === 'admin'
    ).length

    const userCount = allUser.length - adminCount

    return (
        <div className="all-users-page">

            {/* Page Heading */}
            <div className="all-users-heading">
                <div className="all-users-heading-icon">
                    <MdPeopleAlt />
                </div>

                <div className="all-users-heading-text">
                    <h1>User Management</h1>
                    <p>Manage users, view account details and update roles.</p>
                </div>

                <button
                    className="all-users-refresh-btn"
                    onClick={fetchAllUsers}
                    disabled={loading}
                    title="Refresh users"
                >
                    <MdRefresh className={loading ? 'refresh-spinning' : ''} />
                    <span>Refresh</span>
                </button>
            </div>

            {/* Statistics */}
            <div className="all-users-stats">
                <div className="all-users-stat-card">
                    <div className="all-users-stat-icon total-users-icon">
                        <FaUsers />
                    </div>
                    <div>
                        <p>Total Users</p>
                        <h2>{allUser.length}</h2>
                    </div>
                </div>

                <div className="all-users-stat-card">
                    <div className="all-users-stat-icon admin-users-icon">
                        <FaUserShield />
                    </div>
                    <div>
                        <p>Administrators</p>
                        <h2>{adminCount}</h2>
                    </div>
                </div>

                <div className="all-users-stat-card">
                    <div className="all-users-stat-icon regular-users-icon">
                        <MdPeopleAlt />
                    </div>
                    <div>
                        <p>Regular Users</p>
                        <h2>{userCount}</h2>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="all-users-table-card">
                <div className="all-users-table-heading">
                    <div>
                        <h2>All Users</h2>
                        <p>View and manage registered accounts</p>
                    </div>

                    <span className="all-users-count">
                        {allUser.length} Accounts
                    </span>
                </div>

                <div className="all-users-table-wrapper">
                    <table className="all-users-table">
                        <thead>
                            <tr>
                                <th>Sr.</th>
                                <th>User</th>
                                <th>Email Address</th>
                                <th>Role</th>
                                <th>Created Date</th>
                                <th className="action-column">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="all-users-message-cell">
                                        <div className="all-users-loading">
                                            <span className="all-users-spinner"></span>
                                            <p>Loading users...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : allUser.length > 0 ? (
                                allUser.map((el, index) => (
                                    <tr key={el?._id || el?.email || index}>
                                        <td className="all-users-serial">
                                            {String(index + 1).padStart(2, '0')}
                                        </td>

                                        <td>
                                            <div className="all-users-name-cell">
                                                <div className="all-users-avatar">
                                                    {el?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                                <span className="all-users-name">
                                                    {el?.name || 'Unnamed User'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="all-users-email">
                                            {el?.email || '—'}
                                        </td>

                                        <td>
                                            <span
                                                className={`all-users-role ${
                                                    el?.role?.toLowerCase() === 'admin'
                                                        ? 'role-admin'
                                                        : 'role-user'
                                                }`}
                                            >
                                                {el?.role || 'User'}
                                            </span>
                                        </td>

                                        <td className="all-users-date">
                                            {el?.createdAt
                                                ? moment(el.createdAt).format('DD MMM YYYY')
                                                : '—'}
                                        </td>

                                        <td className="action-column">
                                            <button
                                                className="all-users-edit-btn"
                                                title="Edit user role"
                                                aria-label={`Edit role for ${el?.name || 'user'}`}
                                                onClick={() => {
                                                    setUpdateUserDetails(el)
                                                    setOpenUpdateRole(true)
                                                }}
                                            >
                                                <MdModeEdit />
                                                <span>Edit Role</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="all-users-message-cell">
                                        <div className="all-users-empty">
                                            <div className="all-users-empty-icon">
                                                <MdPeopleAlt />
                                            </div>
                                            <h3>No users found</h3>
                                            <p>Registered users will appear here.</p>
                                            <button onClick={fetchAllUsers}>
                                                Try Again
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Update User Role Modal */}
            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    )
}

export default AllUsers