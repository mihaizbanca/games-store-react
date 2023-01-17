import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import { Favorites } from "./pages/Favorites";
import { Product } from "./pages/Product";
import { Header } from "./components/Header";
import { CartContext } from "./store/Cart/context";
import { useReducer } from "react";
import { cartReducer, initialState } from "./store/Cart/reducer";
import {
  themeReducer,
  initialState as themeInitialState,
} from "./store/Theme/reducer";
import { ThemeContext } from "./store/Theme/context";
import { favInitialState, favReducer } from "./store/Favorites/reducer";
import { FavContext } from "./store/Favorites/context";

export default function App() {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );

  const [favState, favDispatch] = useReducer(favReducer, favInitialState);

  const cartContextValue = {
    cartState,
    cartDispatch,
  };

  const themeContextValue = {
    themeState,
    themeDispatch,
  };

  const favContextValue = {
    favState,
    favDispatch,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <FavContext.Provider value={favContextValue}>
          <div className="App primary">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/fav" element={<Favorites />} />
            </Routes>
          </div>
        </FavContext.Provider>
      </ThemeContext.Provider>
    </CartContext.Provider>
  );
}
