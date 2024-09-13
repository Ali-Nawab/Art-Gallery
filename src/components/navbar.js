import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./navbar.css";
import { AuthPopup } from "./popup"; // Import the popup
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase"; // Firebase auth object
import { ShoppingCart } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);
    const [showPopup, setShowPopup] = useState(false);  // State for popup
    const [user, loading] = useAuthState(auth);  // Firebase auth state
    const [showDropdown, setShowDropdown] = useState(false);  // State for dropdown
    const [searchQuery, setSearchQuery] = useState(""); // State to capture search input

    const navigate = useNavigate();

    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
    };

    const handleLoginClick = () => {
        setShowPopup(true);  // Open popup for login
    };

    const closePopup = () => {
        setShowPopup(false); // Close popup
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);  // Toggle dropdown visibility
    };

    const handleSignOut = () => {
        auth.signOut();
        setShowDropdown(false);  // Close dropdown after signing out
    };

    // Generate initials from email
    const getInitialsFromEmail = (email) => {
        if (!email) return "";
        const namePart = email.split("@")[0];
        const firstChar = namePart.charAt(0).toUpperCase();
        const numberPart = namePart.match(/\d+/) ? namePart.match(/\d+/)[0] : "";
        return `${firstChar}${numberPart}`;
    };

    useEffect(() => {
        const handleResize = () => {
            setShowNavLinks(window.innerWidth >= 876);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            if (searchQuery.toLowerCase() === "arts") {
                navigate("/arts");
            } else if (searchQuery.toLowerCase() === "artists") {
                navigate("/artists");
            } else if (searchQuery.toLowerCase() === "islamic arts") {
                navigate("/arts");
                setTimeout(() => {
                    const islamicArtsDiv = document.getElementById("islamic-arts");
                    if (islamicArtsDiv) {
                        islamicArtsDiv.scrollIntoView({ behavior: "smooth" });
                    }
                }, 500);
            } else if (searchQuery.toLowerCase() === "caligraphy") {
                navigate("/arts");
                setTimeout(() => {
                    const islamicArtsDiv = document.getElementById("caligraphy");
                    if (islamicArtsDiv) {
                        islamicArtsDiv.scrollIntoView({ behavior: "smooth" });
                    }
                }, 500);
            } else if (searchQuery.toLowerCase() === "sculpture") {
                navigate("/arts");
                setTimeout(() => {
                    const islamicArtsDiv = document.getElementById("sculpture");
                    if (islamicArtsDiv) {
                        islamicArtsDiv.scrollIntoView({ behavior: "smooth" });
                    }
                }, 500);
            } else if (searchQuery.toLowerCase() === "war arts") {
                navigate("/arts");
                setTimeout(() => {
                    const islamicArtsDiv = document.getElementById("war-arts");
                    if (islamicArtsDiv) {
                        islamicArtsDiv.scrollIntoView({ behavior: "smooth" });
                    }
                }, 500);
            }
                
            setSearchQuery(""); // Clear the input after search
        }
    };


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-header">
                    <div className="navbar-logo">
                        <Link to="/" className="logo">
                            <h1>Art</h1>
                        </Link>
                    </div>
                    <div className="navbar-search">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch} // Handle search on 'Enter' press
                        />
                    </div>
                    {!loading && user && (
                        <div className="user-info">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    className="user-avatar"
                                    onClick={toggleDropdown}
                                />
                            ) : (
                                <div
                                    className="user-initials"
                                    onClick={toggleDropdown}
                                >
                                    {getInitialsFromEmail(user.email)}
                                </div>
                            )}

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <button onClick={handleSignOut}>Sign Out</button>
                                </div>
                            )}
                        </div>
                    )}
                    <button onClick={toggleNavLinks} className="nav-toggle">☰</button>
                </div>
                <div className={`navbar-links ${showNavLinks || window.innerWidth >= 876 ? 'show' : ''}`}>
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/arts" className="nav-item">Arts</Link>
                    <Link to="/artists" className="nav-item">Artists</Link>
                    <Link to="/contact" className="nav-item">Contact</Link>

                    {!loading && !user && (
                        <button className="nav-item login-btn" onClick={handleLoginClick}>Login</button>
                    )}
                </div>
            </div>
            <Link to="/cart" className="shopping-cart">
                <ShoppingCart size={32} weight="bold" />
            </Link>
            <AuthPopup isOpen={showPopup} onClose={closePopup} />
        </nav>
    );
};
