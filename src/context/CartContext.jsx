import { createContext, useState, useContext } from "react";
const CartContext = createContext();
export function useCart() { return useContext(CartContext); }
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  function addToCart(product, qty = 1) {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { ...product, quantity: qty }];
    });
  }
  function removeFromCart(id) { setCartItems(prev => prev.filter(i => i.id !== id)); }
  function updateQuantity(id, qty) {
    if (qty < 1) return;
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  }
  function clearCart() { setCartItems([]); }

  let cartTotal = 0;
  let cartCount = 0;
  for (const item of cartItems) {
    cartTotal += item.price * item.quantity;
    cartCount += item.quantity;
  }
  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>{children}</CartContext.Provider>;
}
