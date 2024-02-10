import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDisplay.module.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { auth, db, storage } from "../../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import TriggerContext from "../../Context";

export default function ProductDisplay() {
  const { all_products } = useSelector((s) => s.product);
  const { triggerRender } = useContext(TriggerContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.ProductID === Number(productId));
  const [imageUrl, setImageUrl] = useState(null);
  console.log("running display");
  const fetcher = async (suffix) => {
    try {
      const storageRef = ref(
        storage,
        `${product.category}/${product.categoryNo}${suffix}.jpg`
      );
      const url = await getDownloadURL(storageRef);

      return url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  };

  const fetchImages = async () => {
    const imageUrl = await fetcher("");
    const imagea = await fetcher("a");
    const imageb = await fetcher("b");
    const imagec = await fetcher("c");

    setImageUrl([imageUrl, imagea, imageb, imagec]);

    // Now you can use the other image URLs as needed
  };

  const cartItem = {
    productId: productId,
    amount: 1,
  };

  const addToCart = () => {
    console.log("running add to cart");
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(collection(db, "user"), userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const cartCollection = collection(userDocRef, "cart");
          const cartItemDocRef = doc(cartCollection, productId);
          const cartItemDocSnapshot = await getDoc(cartItemDocRef);

          if (cartItemDocSnapshot.exists()) {
            const currentAmount = cartItemDocSnapshot.data().amount || 0;
            const updatedAmount = currentAmount + 1;
            await updateDoc(cartItemDocRef, { amount: updatedAmount });
          } else {
            await setDoc(cartItemDocRef, { ...cartItem, amount: 1 });
          }
        } else {
          const usersCollection = collection(db, "user");
          const newUserDocRef = doc(usersCollection, userId);
          const cartCollection = collection(newUserDocRef, "cart");

          await setDoc(newUserDocRef, { userId });
          await setDoc(doc(cartCollection, productId), cartItem);
        }
        triggerRender();
      } else {
        console.log("No user is signed in.");
      }
    });
  };

  useEffect(() => {
    if (product) {
      fetchImages();
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productInfo}>
        <h1>{product.Name}</h1>
        <div className={styles.productDetails}>
          <div>
            <p>Price: Rs.{product.Price}</p>
            <p>Rating: {product.Rating}/5</p>
            <p>Bought: {product.Bought} times</p>
          </div>
          <div>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Old Price: ${product.oldprice}</p>
          </div>
        </div>
        <div>
          <button onClick={addToCart}>Add To Cart</button>
        </div>
      </div>
      <div className={styles.productImage}>
        {imageUrl && (
          <div>
            {imageUrl[0] && <img width={150} src={imageUrl[0]} alt="product" />}
            {imageUrl[1] && <img src={imageUrl[1]} alt="product" />}
            {imageUrl[2] && <img src={imageUrl[2]} alt="product" />}
            {imageUrl[3] && <img src={imageUrl[3]} alt="product" />}
          </div>
        )}
      </div>
    </div>
  );
}
