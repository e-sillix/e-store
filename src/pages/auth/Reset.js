import React, { useState } from "react";
import styles from "./auth.module.scss";
import resetimg from "../../assets/resetimage.jpg";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "../../components/loader/Loader";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Attempt to send a password reset email
      await sendPasswordResetEmail(auth, email);

      // If successful, show success message
      setIsLoading(false);
      toast.success("Check your email for the password reset link.");
    } catch (error) {
      // If there is an error, explicitly check if the email does not exist
      setIsLoading(false);

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      ) {
        // Handle the case where the email does not exist
        toast.error("Email not found in the database.");
      } else {
        // Handle other errors
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetimg} alt="login " width={400} />
        </div>
        <div className={styles.form}>
          <Card>
            <h2>Reset Password</h2>

            <form onSubmit={resetPassword}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="--btn --btn--primary --btn-block"
              >
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
