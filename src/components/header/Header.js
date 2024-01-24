import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
  const logo = () => {
    return (
      <div className={styles.logo}>
        <Link to="/">
          E-<span>Store</span>.
        </Link>
      </div>
    );
  };
  const cartIcon = () => {
    return (
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    );
  };
  return (
    <header>
      <div className={styles.header}>
        {logo()}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${"hide-meny"}`}>
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo()}
              <FaTimes size={22} color="white" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/order-History">My Orders</Link>
            </span>
            <span className={styles.cart}>{cartIcon()}</span>
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cartIcon()}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
}
