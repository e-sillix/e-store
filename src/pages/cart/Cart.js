import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.scss"; // Import your SCSS module for styles
import { db, storage } from "../../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { getDownloadURL, ref } from "firebase/storage";
import TriggerContext from "../../Context";

export default function Cart() {
  const { triggerRender } = useContext(TriggerContext);
  const [cartProduct, setCartProduct] = useState(null);
  const { cartProducts, totalCost } = useSelector((s) => s.cart);
  const [imageUrls, setImageUrls] = useState({});

  const { isLoggedIn, userID } = useSelector((s) => s.auth);
  const getCart = async () => {
    if (isLoggedIn) {
      const userDocRef = doc(collection(db, "user"), userID);
      try {
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const cartCollection = collection(userDocRef, "cart");
          const cartQuerySnapshot = await getDocs(cartCollection);
          const cartData = cartQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCartProduct(cartData);
        } else {
          // console.log("User document doesn't exist.");
        }
      } catch (error) {
        console.error("Error getting user cart data:", error);
      }
    } else {
      // console.log("User not logged in");
    }
  };

  useEffect(() => {
    getCart();
  }, [triggerRender]);

  const { all_products } = useSelector((s) => s.product);
  const finder = (id) => {
    return all_products.find((i) => i.productId === parseInt(id));
  };
  const removeItem = async (id) => {
    console.log(id);
    try {
      const userDocRef = doc(db, "user", userID);
      const cartItemDocRef = doc(userDocRef, "cart", id);
      await deleteDoc(cartItemDocRef);
      console.log("Cart item successfully deleted!");
      triggerRender();
    } catch (error) {
      console.error("Error removing cart item: ", error);
    }
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = {};
      for (const product of cartProduct) {
        const p = finder(product.productId);
        const url = await fetchImageUrl(p.category, p.categoryNo);
        urls[product.productId] = url;
      }
      setImageUrls(urls);
    };

    if (cartProduct) {
      fetchImageUrls();
    }
  }, [cartProduct, triggerRender]);

  const fetchImageUrl = async (category, categoryNo) => {
    try {
      const storageRef = ref(storage, `${category}/${categoryNo}.jpg`);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  };

  const renderCartItems = () => {
    if (!cartProduct) return null;

    return cartProduct.map((product) => {
      const p = finder(product.productId);
      const imageUrl = imageUrls[product.productId];

      return (
        <div key={product.productId}>
          <div className={styles.cartItem}>
            {imageUrl && (
              <img src={imageUrl} alt="Product" className={styles.itemImage} />
            )}
            <div className={styles.itemDetails}>
              <h3>{p.name}</h3>
              <p>Price: Rs.{p.newPrice}</p>
              <p>Quantity: {product.amount}</p>
              <button onClick={() => removeItem(product.productId)}>
                Remove item
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.cartContainer}>
      <h2>Your Shopping Cart</h2>
      <div className={styles.cartItems}>{renderCartItems()}</div>
      <div className={styles.cartSummary}>
        <h3>Order Summary</h3>
        <p>Total Items: {cartProducts}</p>
        <p>Total Price: Rs.{totalCost}</p>
        <button className={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
