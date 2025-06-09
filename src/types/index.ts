export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  unit: string
  total: number
}

export interface Receipt {
  id: string
  date: string
  items: CartItem[]
  total: number
}
