import { db, ref, set, onValue, push, update, remove } from "../firebase";

const testConnection = async () => {
  try {
    await set(ref(db, "testConnection"), {
      connectedAt: new Date().toISOString(),
      message: "Firebase Realtime DB ulandi ✅",
    });
    console.log("✅ Firebase bilan aloqa bor!");
  } catch (error) {
    console.error("❌ Firebase ulanmagan:", error);
  }
};
testConnection();

const productsRef = ref(db, "products");

class ProductService {
  // Real-time listener
  onProductsChanged(callback) {
    onValue(productsRef, (snapshot) => {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        products.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      callback(products);
    });
  }

  // Kategoriyalarni olish
  getCategories() {
    let categories = new Set();
    onValue(productsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();
        if (product.category) {
          categories.add(product.category);
        }
      });
    });
    return Array.from(categories);
  }

  getAllProducts(callback) {
    onValue(productsRef, (snapshot) => {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        products.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      callback(products); // Callback ga mahsulotlar ro'yxatini o'tkazamiz
    });
  }

  // Yangi mahsulot qo'shish
  async addProduct(productData) {
    const newProductRef = push(productsRef);
    await set(newProductRef, {
      ...productData,
      price: Number(productData.price),
    });
    return { id: newProductRef.key, ...productData };
  }

  // Mahsulotni yangilash
  async updateProduct(id, productData) {
    const productRef = ref(db, `products/${id}`);
    await update(productRef, productData);
    return { id, ...productData };
  }

  // Mahsulotni o'chirish
  async deleteProduct(id) {
    const productRef = ref(db, `products/${id}`);
    await remove(productRef);
    return true;
  }

  // Qidiruv va filtratsiya
  searchProducts(searchTerm, category) {
    let products = [];
    onValue(productsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const product = { id: childSnapshot.key, ...childSnapshot.val() };
        const matchesSearch = product.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          category === "Barchasi" || product.category === category;
        if (matchesSearch && matchesCategory) {
          products.push(product);
        }
      });
    });
    return products;
  }
}

export default new ProductService();