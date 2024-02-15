import React from "react";
import styles from "./Contact.module.scss";
import { toast } from "react-toastify";

export default function Contact() {
  const submitForm = (e) => {
    e.preventDefault();
    toast.error("This feature not available yet.");
  };
  return (
    <div className={styles.contactCont}>
      <div>
        <h2>Contact Us</h2>
        <div className={styles.contactPara}>
          <p>
            Need to get in touch with us? Either fill out the form with your
            inquiry or find the department email you'd like to contact below.
          </p>
        </div>
      </div>
      <div>
        <div className={styles.contact_form}>
          <form onSubmit={submitForm}>
            <label className={styles.labelForm} htmlFor="name">
              Name*
            </label>
            <input
              className={styles.inputForm}
              type="text"
              id="name"
              required
            />

            <label className={styles.labelForm} htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              className={styles.inputForm}
              id="email"
              required
            />

            <label className={styles.labelForm} htmlFor="about">
              What can we help you with?*
            </label>
            <input
              className={styles.inputForm}
              type="text"
              id="about"
              required
            />

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
