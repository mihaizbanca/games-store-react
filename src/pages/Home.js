import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CartContext } from "../store/Cart/context";
import { addToCart } from "../store/Cart/actions";
import { ThemeContext } from "../store/Theme/context";
import { setDarkTheme, setLightTheme } from "../store/Theme/actions";
import { FavContext } from "../store/Favorites/context";
import { addToFav } from "../store/Favorites/actions";

export function Home() {
  // Cerem 4 produse de la API si actualizam state-ul.
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals?onSale&pageSize=4")
      .then((response) => response.json())
      .then((products) => {
        // console.log("Produsele: ", products);

        setProducts(products);
      });
  }, []);

  const { cartDispatch } = useContext(CartContext);

  const { themeState, themeDispatch } = useContext(ThemeContext);

  const { favDispatch } = useContext(FavContext);

  function handleAddToCartClick(product) {
    const actionResult = addToCart(product);

    cartDispatch(actionResult);
  }

  function handleAddToFavClick(product) {
    const actionResult = addToFav(product);

    favDispatch(actionResult);
  }

  function handleThemeChange() {
    let actionResult;
    if (themeState.theme === "light") {
      actionResult = setDarkTheme();
    } else {
      actionResult = setLightTheme();
    }
    themeDispatch(actionResult);
  }

  // Afisam pe ecran produsele venite de la API.
  return (
    <div className={themeState.theme === "light" ? "bg-white" : "bg-dark"}>
      <div className="d-flex flex-column align-items-center">
        <Button
          variant="outline-primary"
          className="mt-3"
          onClick={handleThemeChange}
        >
          Change theme
        </Button>
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: "18rem" }}
              className="m-3"
            >
              {/* Fiecare card are link-ul corespunzator catre pagina de produs. */}
              {/* Functia encodeURI transforma caracterele care nu sunt acceptate in url. */}
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
      <Link to="/products">Vezi toate produsele</Link>
    </div>
  );
}
