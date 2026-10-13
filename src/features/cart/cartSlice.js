import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem("spiceroute-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Could not load cart:", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: loadCart()
  },

  reducers: {
    addToCart(state, action) {
      const food = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === food.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...food,
          quantity: 1
        });
      }
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity -= 1;
      }

      state.items = state.items.filter(
        (item) => item.quantity > 0
      );
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;