import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi"; //icons imported
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top"); // for creating scrolling ellect of menues
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false); // for making menus in header 
    const [query, setQuery] = useState(""); // to set searched text
    const [showSearch, setShowSearch] = useState(""); 
    const navigate = useNavigate(); // to move to that path 
    const location = useLocation(); 

   // when we change change the page of the to movie or tv show then we have to set again scroll bar to top that's why we made scrollTo to 0,0 
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]); {/*when ever the location changes*/}

    //  when we scroll down greater than 200 then we have to change the css by making setShow to hide or show  and when it is less than 200 it should be top
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            // after searching make search option false
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                     {/* movix logo from movix-logo.svg */}
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                     {/* this is for search icon */}
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                    {/* same all the above for mobileView */}
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                   
                </div>
            </ContentWrapper>
            {/* this for search bar and to search if showSearch is true */}
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};
    // VscChromeClose is a icon of close 
export default Header;
