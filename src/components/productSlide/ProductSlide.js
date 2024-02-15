import React from "react";
import styles from "./productSlide.module.scss";
import ProductCard from "../productCard/ProductCard";

export default function ProductSlide({ category, products }) {
  if (!products) {
    return;
  } else {
    const categoryproduct = products.filter((i) => i.category === category);
    return (
      <div className={styles.slidecard}>
        <hr />
        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
        <div className={styles.products}>
          {categoryproduct.map((p) => {
            return <ProductCard {...p} key={p.id} category={category} />;
          })}
        </div>
      </div>
    );
  }
}
