export type CartItem = {
  slug: string
  name: string
  color: string
  size: string
  price: number
  image: string
}

const CART_KEY = 'zanova_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function addToCart(item: CartItem): void {
  const cart = getCart()
  // Si ya existe el mismo producto + color + talle, no duplicar
  const exists = cart.some(
    i => i.slug === item.slug && i.color === item.color && i.size === item.size
  )
  if (exists) return
  localStorage.setItem(CART_KEY, JSON.stringify([...cart, item]))
}

export function removeFromCart(slug: string, color: string, size: string): void {
  const cart = getCart().filter(
    i => !(i.slug === slug && i.color === color && i.size === size)
  )
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY)
}