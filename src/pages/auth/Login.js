import React, { useState } from "react";
import styles from "./auth.module.scss";
import logimg from "../../assets/logimage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // window.location.reload();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        navigate("/");
        toast.success("Login Successful");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  const googlelogin = (e) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // window.location.reload();
        setIsLoading(false);
        navigate("/");
        toast.success("Login Successful");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={logimg} alt="login " width={400} />
        </div>
        <div className={styles.form}>
          <Card>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="--btn --btn--primary --btn-block"
                type="submit"
              >
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p> -- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={googlelogin}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </Card>
        </div>
      </section>
    </>
  );
}
