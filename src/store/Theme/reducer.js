export const initialState = {
  theme: "light",
};

export function themeReducer(state, action) {
  switch (action.type) {
    case "LIGHT": {
      return {
        theme: "light",
      };
    }
    case "DARK": {
      return {
        theme: "dark",
      };
    }
    default: {
      return state;
    }
  }
}
