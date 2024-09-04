"use client";
import Link from "next/link";
import { useState } from "react";
const Menubtn = ({ renter }) => {
  const [isOpen, setIsOpen] = useState(false);

  let menu = "nav navHome";

  const test = () => {
    !isOpen ? setIsOpen(true) : setIsOpen(false);

    isOpen ? (menu += " open-nav") : (menu = "nav navHome");
  };
  const closeMenu = () => {
    setTimeout(() => {
      setIsOpen(false);
      menu = "nav navHome";
    }, 100);
  };

  return (
    <>
      <nav className={isOpen ? (menu += " open-nav") : menu}>
        <ul>
          <li>
            <Link onClick={closeMenu} href="/extras">
              Rates & Amenities
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} href="/search">
              Listings
            </Link>
          </li>
          {renter ? (
            <li>
              <Link className="acct-icon" onClick={closeMenu} href="/account">
                <span class="material-symbols-outlined acct-icon-bg">person</span>
              </Link>
            </li>
          ) : (
            <li>
              <Link onClick={closeMenu} href="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Link className="menu-link" href="" onClick={test}>
        <span className="material-symbols-outlined">Menu</span>
      </Link>
    </>
  );
};

export default Menubtn;
