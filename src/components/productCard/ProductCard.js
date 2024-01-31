import React from "react";
import styles from "./ProductCard.module.scss";

import { useState, useEffect } from "react";
import { storage } from "../../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

export default function ProductCard({
  Name,
  Price,
  Rating,
  Bought,
  category,
  categoryNo,
  ProductID,
}) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const storageRef = ref(storage, `${category}/${categoryNo}.jpg`); // Replace with the actual path to your image
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, []);
  return (
    <div className={styles.productcard}>
      <Link to={`/product/${ProductID}`}>
        <img
          src={imageUrl}
          onClick={window.scroll(0, 0)}
          alt="product"
          width={100}
        />
      </Link>
      <h2>{Name}</h2>
      <h3>Rs. {Price}</h3>
      <p>Ratings: {Rating}/5</p>
      <p>{Bought}</p>
    </div>
  );
}
