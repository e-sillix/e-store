import React, { useEffect, useState } from "react";

import styles from "./Home.module.scss";
import Slider from "../../components/slider/Slider";
import ProductSlide from "../../components/productSlide/ProductSlide";
import { useSelector } from "react-redux";

export default function Home() {
  const { all_products } = useSelector((s) => s.product);

  return (
    <div>
      <Slider />
      <br />

      <ProductSlide category="men" products={all_products} />
      <ProductSlide category="women" products={all_products} />
    </div>
  );
}
