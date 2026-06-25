import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  // Change qty — if qty drops to 0, remove the item
  function updateQty(id, newQty) {
    if (newQty < 1) { removeFromCart(id); return }
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: newQty } : i))
  }

  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((i) => i.id !== id))
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext)
}