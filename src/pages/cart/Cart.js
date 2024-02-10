import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss"; // Import your SCSS module for styles
import { auth, db } from "../../firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function Cart() {
  const [cartProduct, setCartProduct] = useState(null);

  const get_cart = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);
        const userDocRef = doc(collection(db, "user"), userId);
        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const cartCollection = collection(userDocRef, "cart");
            const cartQuerySnapshot = await getDocs(cartCollection);

            // Extract cart items from the query snapshot
            const cartData = cartQuerySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(cartData);

            setCartProduct(cartData);
          } else {
            console.log("User document doesn't exist.");
            return [];
          }
        } catch (error) {
          console.error("Error getting user cart data:", error);
          return [];
        }
      } else {
        console.log("user not slogged in");
      }
    });
  };
  useEffect(() => {
    get_cart();
  }, []);
  const { all_products } = useSelector((s) => s.product);
  const finder = (id) => {
    return all_products.find((i) => i.ProductID === parseInt(id));
  };

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

        {cartProduct &&
          cartProduct.map((i) => {
            const p = finder(i.productId);
            console.log(i.productId);
            return <p>{p && p.Name}</p>;
          })}
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
