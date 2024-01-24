import React from "react";
import styles from "./auth.module.scss";
import resetimg from "../../assets/resetimage.jpg";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";

export default function Reset() {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetimg} alt="login image" width={400} />
      </div>
      <div className={styles.form}>
        <Card>
          <h2>Reset Password</h2>

          <form>
            <input type="email" placeholder="Email" required />

            <button className="--btn --btn--primary --btn-block">
              Reset Password
            </button>
            <p className={styles.links}>
              <p>
                <Link to="/login">- Login</Link>
              </p>
              <p>
                <Link to="/register">- Register</Link>
              </p>
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
