import React from "react";
import styles from "./auth.module.scss";
import logimg from "../../assets/logimage.jpg";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
export default function Login() {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={logimg} alt="login image" width={400} />
      </div>
      <div className={styles.form}>
        <Card>
          <h2>Login</h2>

          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button className="--btn --btn--primary --btn-block">Login</button>
            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p> -- or --</p>
          </form>
          <button className="--btn --btn-danger --btn-block">
            <FaGoogle color="#fff" /> Login With Google
          </button>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </Card>
      </div>
    </section>
  );
}
