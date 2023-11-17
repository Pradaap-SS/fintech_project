import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { close, menu } from "../assets";
import { navLinks } from "../constants";
import Logout from "./Logout"; // Import the Logout component

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in using localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleNavLinkClick = (title) => {
    setActive(title);
    if (title === "Home") {
      navigate("/");
    } else if (title === "Login") {
      navigate("/login");
    } else if (title === "Services") {
      navigate("/services");

    }
    else if(title === "Contact") {
      navigate("/contact");

    }

     else {
      // Handle other navigation logic if needed
      // For example: navigate(`/${title.toLowerCase()}`)
    }
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      {/*<img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />*/}
      <a href="/" className="text-gradient text-[34px]">
        Quantum Vault
      </a>{" "}

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => handleNavLinkClick(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        {isLoggedIn && (
          <li className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite">
            <Logout />
          </li>
        )}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
