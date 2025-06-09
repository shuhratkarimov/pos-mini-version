import productsData from "../data/products.json"

class ProductService {
  constructor() {
    this.products = [...productsData]
    this.loadFromStorage()
  }

  // LocalStorage dan yuklash
  loadFromStorage() {
    const stored = localStorage.getItem("santexnika_products")
    if (stored) {
      this.products = JSON.parse(stored)
    }
  }

  // LocalStorage ga saqlash
  saveToStorage() {
    localStorage.setItem("santexnika_products", JSON.stringify(this.products))
  }

  // Barcha mahsulotlarni olish (GET)
  getAllProducts() {
    return [...this.products]
  }

  // ID bo'yicha mahsulot olish
  getProductById(id) {
    return this.products.find((product) => product.id === id)
  }

  // Yangi mahsulot qo'shish (POST)
  addProduct(productData) {
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      price: Number(productData.price),
    }
    this.products.push(newProduct)
    this.saveToStorage()
    return newProduct
  }

  // Mahsulotni yangilash (PUT)
  updateProduct(id, productData) {
    const index = this.products.findIndex((product) => product.id === id)
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...productData,
        price: Number(productData.price),
      }
      this.saveToStorage()
      return this.products[index]
    }
    return null
  }

  // Mahsulotni o'chirish (DELETE)
  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id)
    if (index !== -1) {
      const deleted = this.products.splice(index, 1)[0]
      this.saveToStorage()
      return deleted
    }
    return null
  }

  // Kategoriyalar ro'yxati
  getCategories() {
    const categories = [...new Set(this.products.map((p) => p.category))]
    return ["Barchasi", ...categories]
  }

  // Qidiruv va filtr
  searchProducts(searchTerm, category) {
    return this.products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = category === "Barchasi" || product.category === category
      return matchesSearch && matchesCategory
    })
  }
}

export default new ProductService()
