import React from "react";
import styles from "./auth.module.scss";
import regimg from "../../assets/regimage.jpg";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";

export default function Register() {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.form}>
        <Card>
          <h2>Register</h2>

          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button className="--btn --btn--primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </span>
        </Card>
      </div>
      <div className={styles.img}>
        <img src={regimg} alt="login image" width={400} />
      </div>
    </section>
  );
}
