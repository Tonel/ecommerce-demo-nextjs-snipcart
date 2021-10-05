import styles from "./Product.module.css";
import { Image } from "react-datocms";

export default function DatoProduct(product) {
  const { id, image, name, description, price } = product;

  return (
    <div key={id} className={styles.product}>
      <Image data={image.responsiveImage} />
      <h3>{name}</h3>
      <p>{description}</p>
      <span>${price}</span>
      <div>
        <button
          className="snipcart-add-item"
          data-item-id={id}
          data-item-image={image.url}
          data-item-name={name}
          data-item-url="/"
          data-item-price={price}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
