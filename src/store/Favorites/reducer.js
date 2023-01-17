// State-ul initial al cart-ului.
export const favInitialState = {
  // Initial nu avem produse in cart.
  products: [],
};

// Reducerul primeste ca parametri state-ul, respectiv rezultatul apelului unei actiuni.
export function favReducer(state, action) {
  // Evaluam tipurile actiunii:
  switch (action.type) {
    case "ADD_TO_FAV": {
      // Din state extragem produsele anterioare.
      const previousProducts = state.products;
      // Din actiune extragem produsul adaugat.
      const newProduct = action.payload;

      const foundProduct = previousProducts.find((product) => {
        return product.id === newProduct.id;
      });

      if (!foundProduct) {
        newProduct.quantity = 1;

        const newState = {
          products: [...previousProducts, newProduct],
        };

        return newState;
      } else {
        const updatedProducts = previousProducts.map((product) => {
          if (product.id === newProduct.id) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }

          return product;
        });

        // Generam noul state.
        const newState = {
          products: [...updatedProducts],
        };
        // Returnam noul state.
        return newState;
      }
    }

    case "REMOVE_FROM_FAV": {
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload;
      });
      const newState = { products: filteredProducts };
      return newState;
    }
    // Nu uitam sa returnam state-ul pe cazul default
    default:
      return state;
  }
}
