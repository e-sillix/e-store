import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogOut } from "../hiddenLink/hiddenLink";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setUserName(uName);
        } else {
          setUserName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
      } else {
        setUserName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch]);

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
  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("LogOut Succesfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
              <ShowOnLogOut>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogOut>
              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} />
                  {userName}
                </a>
              </ShowOnLogin>
              <NavLink to="/register" className={activeLink}>
                Register
              </NavLink>
              <ShowOnLogin>
                <NavLink to="/order-History" className={activeLink}>
                  My Orders
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={logOut}>
                  LogOut
                </NavLink>
              </ShowOnLogin>
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
