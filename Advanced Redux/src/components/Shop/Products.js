import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCTS = [
  {
    id: "p1",
    title: "Journey",
    price: 10,
    desc: "dummy description",
  },
  {
    id: "p2",
    title: "Фильмы",
    price: 20,
    desc: "more dummy description",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.desc}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
