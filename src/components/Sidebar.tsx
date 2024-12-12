import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../app/store'
import { logout } from '../features/Auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'


const Sidebar: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className="h-screen col-start-1 col-end-2 flex flex-col justify-between bg-base-200 text-base-content p-6 shadow-lg">
            {/* User Greeting */}
            <div className="mb-6 text-center text-lg font-medium">
                <p>{user?.name}</p>
            </div>

            {/* Navigation Items */}
            <ul className="menu bg-base-200 rounded-box">
                <li className="hover:bg-primary hover:text-white rounded-md">
                    <Link to='/users' className="flex items-center space-x-2">
                        {/* User Icon (SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span>User Dashboard</span>
                    </Link>
                </li>
                <li className="hover:bg-primary hover:text-white rounded-md">
                    <Link to='/analytics' className="flex items-center space-x-2">
                        {/* Analytics Icon (SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M21 6h-3v13h3v-13zm-5 0h-3v10h3v-10zm-5 0h-3v7h3v-7zm-5 0h-3v4h3v-4zm-5 0h-2v15h2v-15zm12 0h3v13h-3v-13z" />
                        </svg>
                        <span>Analytics Dashboard</span>
                    </Link>
                </li>
            </ul>

            {/* Logout Button */}
            <div className="mt-auto">
                {user && (
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline border-none btn-error w-full mt-4"
                        aria-label="Logout"
                    >
                        {/* Simple Logout Icon (SVG) */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            width="24"
                            height="24"
                        >
                            <path d="M13 3H3v18h10M12 15l6-6-6-6" />
                        </svg>
                        <span>Logout</span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Sidebar
