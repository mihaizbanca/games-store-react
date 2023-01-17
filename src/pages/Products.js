import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CartContext } from "../store/Cart/context";
import { addToCart } from "../store/Cart/actions";
import { FavContext } from "../store/Favorites/context";
import { addToFav } from "../store/Favorites/actions";

export function Products() {
  // Luam produse de la API si actualizam state-ul.
  const [products, setProducts] = useState([]);
  const { cartDispatch } = useContext(CartContext);
  const { favDispatch } = useContext(FavContext);

  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  function handleAddToCartClick(product) {
    const actionResult = addToCart(product);

    cartDispatch(actionResult);
  }

  function handleAddToFavClick(product) {
    const actionResult = addToFav(product);

    favDispatch(actionResult);
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        {/* Afisam produsele pe ecran, sub forma de carduri de Bootstrap. */}
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: "18rem" }}
              className="m-3"
            >
              {/* Fiecare card are link-ul corespunzator catre pagina de produs. */}
              {/* Functia encodeURI transforma caracterele care nu sunt acceptate in url */}
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button
                variant="success"
                onClick={() => {
                  handleAddToCartClick({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                    retailPrice: product.retailPrice,
                  });
                }}
              >
                Adaugă în coș
              </Button>
              <Button
                variant="outline-info"
                onClick={() => {
                  handleAddToFavClick({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                    retailPrice: product.retailPrice,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
