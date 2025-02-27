import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthChange = () => {
            console.log("Auth state changed, updating navbar...");
            setIsAuthenticated(UserService.isAuthenticated());
            setIsAdmin(UserService.isAdmin());
        };

        window.addEventListener("authChanged", handleAuthChange);
        return () => window.removeEventListener("authChanged", handleAuthChange);
    }, []);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            UserService.logout();
            navigate("/");
        }
    };

    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">VARUN Dev</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
