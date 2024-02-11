import React, { useState } from "react";
import styles from "./auth.module.scss";
import regimg from "../../assets/regimage.jpg";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("password do not match");
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // window.location.reload();
        // Signed up
        const user = userCredential.user;
        console.log(user);
        setIsLoading(true);
        toast.success("registration succesful...");
        navigate("/login");
        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
        // ..
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.form}>
          <Card>
            <h2>Register</h2>

            <form onSubmit={registerUser}>
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
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
              <button
                type="submit"
                className="--btn --btn--primary --btn-block"
              >
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
          <img src={regimg} alt="login " width={400} />
        </div>
      </section>
    </>
  );
}
