export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'cakes' | 'cupcakes' | 'cake-pops'
  image?: string
  emoji: string
  flavors?: string[]
  sizes?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedFlavor?: string
  selectedSize?: string
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number, flavor?: string, size?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

export interface OrderFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  deliveryMethod: 'pickup' | 'delivery'
  address?: string
  city?: string
  zipCode?: string
  specialInstructions?: string
}
