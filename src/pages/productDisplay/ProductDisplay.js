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
import { toast } from "react-toastify";

export default function ProductDisplay() {
  const { isLoggedIn, userID } = useSelector((s) => s.auth);
  console.log("running display");
  const { all_products } = useSelector((s) => s.product);
  const { triggerRender } = useContext(TriggerContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.productId === Number(productId));
  console.log(product);
  const [imageUrl, setImageUrl] = useState(null);
  const fetcher = async (suffix) => {
    try {
      const storageRef = ref(
        storage,
        `${product.category}/${product.categoryNo}${suffix}.jpg`
      );
      const url = await getDownloadURL(storageRef);
      console.log(url);
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

  const addToCart = async (product) => {
    console.log("running add to cart");
    const cartItem = {
      productId: productId,
      amount: 1,
      cost: product.newPrice,
    };

    if (isLoggedIn) {
      console.log("running getcaart 1");
      const userDocRef = doc(collection(db, "user"), userID);
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
        const newUserDocRef = doc(usersCollection, userID);
        const cartCollection = collection(newUserDocRef, "cart");

        await setDoc(newUserDocRef, { userID });
        await setDoc(doc(cartCollection, productId), cartItem);
      }
      toast.success("Item added to Cart");
      triggerRender();
    } else {
      toast.error("No user signed in.");
    }
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
        <h1>{product.name}</h1>
        <div className={styles.productDetails}>
          <div>
            <p>Price: Rs.{product.oldPrice}</p>
            <p>Price: Rs.{product.newPrice}</p>
            <p>Rating: {product.rating}/5</p>
            <p>Bought: {product.bought} times</p>
          </div>
          <div>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Old Price: ${product.oldprice}</p>
          </div>
        </div>
        <div>
          <button onClick={() => addToCart(product)}>Add To Cart</button>
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
