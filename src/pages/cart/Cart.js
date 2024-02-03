import React from "react";
import styles from "./Cart.module.scss"; // Import your SCSS module for styles

export default function Cart() {
  return (
    <div className={styles.cartContainer}>
      <h2>Your Shopping Cart</h2>
      <div className={styles.cartItems}>
        {/* Display your cart items here */}
        <div className={styles.cartItem}>
          <img
            src="product-image.jpg"
            alt="Product"
            className={styles.itemImage}
          />
          <div className={styles.itemDetails}>
            <h3>Product Name</h3>
            <p>Price: $20.00</p>
            <p>Quantity: 2</p>
          </div>
        </div>
        {/* Add more items as needed */}
      </div>
      <div className={styles.cartSummary}>
        <h3>Order Summary</h3>
        <p>Total Items: 3</p>
        <p>Total Price: $60.00</p>
        <button className={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
