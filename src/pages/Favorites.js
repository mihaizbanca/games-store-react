import { useContext } from "react";
import { Button } from "react-bootstrap";
import { removeFromFav } from "../store/Favorites/actions";
import { FavContext } from "../store/Favorites/context";
import { ThemeContext } from "../store/Theme/context";

export function Favorites() {
  const { favState, favDispatch } = useContext(FavContext);
  const { themeState } = useContext(ThemeContext);

  function handleFavRemove(id) {
    const actionResult = removeFromFav(id);

    favDispatch(actionResult);
  }

  return (
    <div className={themeState.theme === "light" ? "bg-white" : "bg-dark"}>
      {favState.products.length === 0 ? (
        <p>Nu ai produse favorite.</p>
      ) : (
        favState.products.map((product) => {
          return (
            <div key={product.id} className="m-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <img src={product.image} alt="" />
                <strong>{product.name}</strong>
              </div>
              <Button
                variant="outline-info"
                onClick={() => handleFavRemove(product.id)}
              >
                Sterge de la favorite
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
}
