import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import styles from "./Home.module.scss";
import Slider from "../../components/slider/Slider";
import ProductSlide from "../../components/productSlide/ProductSlide";

export default function Home() {
  const [productList, setproductList] = useState([]);
  const productCollectionRef = collection(db, "product"); //here the collections name will come .
  useEffect(() => {
    const getproductList = async () => {
      try {
        const data = await getDocs(productCollectionRef); //this will get that collection data.
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filterData);
        setproductList(filterData);
      } catch (err) {
        console.log(err);
      }
    };
    getproductList();
  }, [productCollectionRef]);
  return (
    <div>
      <Slider />
      <br />

      <ProductSlide category="men" products={productList} />
      <ProductSlide category="women" products={productList} />
    </div>
  );
}
