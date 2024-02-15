import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDisplay.module.scss";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { db, storage } from "../../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import TriggerContext from "../../Context";
import { toast } from "react-toastify";
import rating1 from "../../assets/rating1.jpg";
import rating2 from "../../assets/rating2.jpg";
import secure from "../../assets/secure.png";
import delivery from "../../assets/delivery.png";
import returnimg from "../../assets/return.png";

export default function ProductDisplay() {
  const { isLoggedIn, userID } = useSelector((s) => s.auth);
  // console.log("running display");
  const { all_products } = useSelector((s) => s.product);
  const { triggerRender } = useContext(TriggerContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.productId === Number(productId));
  const [imageToDisplay, setImageToDisplay] = useState(null);
  // console.log(product);
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
    setImageToDisplay(imageUrl);
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

  const ratingStars = (n) => {
    const stars = [];
    let w = 20;
    for (let i = 1; i <= n; i++) {
      stars.push(<img key={i} src={rating1} alt="star" width={w} />);
    }
    for (let i = 1; i <= 5 - n; i++) {
      stars.push(<img key={i} src={rating2} alt="star" width={w} />);
    }
    return <>{stars}</>;
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
      <div className={styles.smallImage}>
        {imageUrl && (
          <div className={styles.eachImage}>
            {imageUrl[0] && (
              <img
                src={imageUrl[0]}
                onClick={() => setImageToDisplay(imageUrl[0])}
                alt="product"
              />
            )}
            {imageUrl[1] && (
              <img
                src={imageUrl[1]}
                onClick={() => setImageToDisplay(imageUrl[1])}
                alt="product"
              />
            )}
            {imageUrl[2] && (
              <img
                src={imageUrl[2]}
                onClick={() => setImageToDisplay(imageUrl[2])}
                alt="product"
              />
            )}
            {imageUrl[3] && (
              <img
                src={imageUrl[3]}
                onClick={() => setImageToDisplay(imageUrl[3])}
                alt="product"
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.productImage}>
        {imageToDisplay && (
          <div className={`${styles.eachImage} ${styles.mainImage}`}>
            <img src={imageToDisplay} alt="display product" />
          </div>
        )}
      </div>
      <div className={styles.productInfo}>
        <h1>{product.name}</h1>
        <div className={styles.rating}>
          <span>
            {" "}
            {product.rating} {ratingStars(product.rating)}
          </span>
          <span>{product.bought} ratings</span>
        </div>
        <hr />
        <div className={styles.productDetails}>
          <div>
            <div>
              <span className={styles.percentageOff}>
                -{((product.newPrice / product.oldPrice) * 100).toFixed(0)}%
              </span>

              <span> Rs.{product.newPrice}</span>
            </div>
            <span>M.R.P.: Rs.</span>
            <span className={styles.oldprice}> {product.oldPrice}</span>
            <p>Inclusive of all taxes</p>
            <hr />
            <div className={styles.feature_icons}>
              <div>
                <img src={returnimg} alt="return" width={50} />
                <p>10 days Return & Exchange</p>
              </div>
              <div>
                <img src={delivery} alt="delivery" width={50} />
                <p>eStore Delivered</p>
              </div>
              <div>
                <img src={secure} alt="secure" width={50} />
                <p>Secure transaction</p>
              </div>
            </div>
            <hr />
            <p>Category: {product.category}</p>
            <div>Product Details</div>
            <p> {product.description}</p>
          </div>
        </div>
        <hr />
        <div>
          <button
            onClick={() => addToCart(product)}
            className={styles.addtocart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
