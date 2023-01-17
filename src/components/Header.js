import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../store/Cart/context";
import { ThemeContext } from "../store/Theme/context";

export function Header() {
  const { cartState } = useContext(CartContext);
  const { themeState } = useContext(ThemeContext);

  return (
    <header className={themeState.theme === "light" ? "bg-white" : "bg-dark"}>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          <Link to="/cart">
            Coș (
            {cartState.products.reduce(
              (sum, product) => sum + product.quantity,
              0
            )}
            )
          </Link>
          <Link to="/fav">Favorite</Link>
        </div>
      </div>
    </header>
  );
}
