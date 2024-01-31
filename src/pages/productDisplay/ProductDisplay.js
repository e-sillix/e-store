import React, { useEffect, useState } from "react";
import styles from "./ProductDisplay.module.scss";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { storage } from "../../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";

export default function ProductDisplay() {
  const { all_products } = useSelector((s) => s.product);

  const { productId } = useParams();
  const product = all_products.find((e) => e.ProductID === Number(productId));

  const [imageUrl, setImageUrl] = useState(null);

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
            <p>Price: ${product.Price}</p>
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
          <button>Add To Cart</button>
        </div>
      </div>
      <div className={styles.productImage}>
        {imageUrl && (
          <div>
            {imageUrl[0] && <img src={imageUrl[0]} alt="product" />}
            {imageUrl[1] && <img src={imageUrl[1]} alt="product" />}
            {imageUrl[2] && <img src={imageUrl[2]} alt="product" />}
            {imageUrl[3] && <img src={imageUrl[3]} alt="product" />}
          </div>
        )}
      </div>
    </div>
  );
}
