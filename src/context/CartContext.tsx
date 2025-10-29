'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, CartContextType, Product } from '@/types'

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bakery-cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bakery-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (
    product: Product,
    quantity: number,
    flavor?: string,
    size?: string
  ) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedFlavor === flavor &&
          item.selectedSize === size
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id &&
          item.selectedFlavor === flavor &&
          item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [
        ...prevItems,
        { product, quantity, selectedFlavor: flavor, selectedSize: size },
      ]
    })
  }

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
