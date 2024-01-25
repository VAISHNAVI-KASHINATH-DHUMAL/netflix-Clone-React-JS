//Importing files, package, firebase, hooks 
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Logo from '../Assets/logo.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import List from '../Lists/List';
import Banner from '../Banner/Banner';

function Home() {
    //used useNavigate() hook for navigation
    const navigate = useNavigate();

    //Logout from home 
    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    }
    return (
        <>
            {/*Header Section (Navbar) */}
            <header id="header" className="">
                <div className="header-cont container">
                    <div className="left-cont">
                        <nav className="navbar">
                            <Link to="/"><img src={Logo} alt="logo" className="width-5 height-5" /></Link>
                        </nav>
                        <ul className="main-nav">
                            <li className="nav-item active">Home</li>
                            <li className="nav-item">Tv Shows</li>
                            <li className="nav-item">Movies</li>
                            <li className="nav-item">News & Popular</li>
                            <li className="nav-item">My List</li>
                            <li className="nav-item">Browse by Languages</li>
                        </ul>
                    </div>
                    <div className="right-cont">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </header>

            {/* Banner Section */}
            <Banner />

            {/*API Fetching movies list */}
            <List title="Netflix Originals" param="originals" />
            <List title="Trending Now" param="trending" />
            <List title="Now Playing" param="now_playing" />
            <List title="Popular" param="popular" />
            <List title="Top Rated" param="top_rated" />
            <List title="Upcoming" param="upcoming" />
        </>
    )
}

export default Home

