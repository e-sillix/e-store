import React from "react";
import styles from "./productSlide.module.scss";
import ProductCard from "../productCard/ProductCard";

export default function ProductSlide({ category, products }) {
  const categoryproduct = products.filter((i) => i.category === category);

  return (
    <div className={styles.slidecard}>
      <hr />
      <h3>{category}</h3>
      <div className={styles.products}>
        {categoryproduct.map((p) => {
          return <ProductCard {...p} key={p.id} category={category} />;
        })}
      </div>
    </div>
  );
}
