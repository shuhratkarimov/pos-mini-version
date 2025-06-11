import { db, ref, set, onValue, push, update, remove } from "../firebase";

const testConnection = async () => {
  try {
    await set(ref(db, "testConnection"), {
      connectedAt: new Date().toISOString(),
      message: "Firebase Realtime DB ulandi ✅",
    });
    console.log("✅ Firebase bilan aloqa bor! Vaqt:", new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" }));
  } catch (error) {
    console.error("❌ Firebase ulanmagan:", error);
  }
};
testConnection();

const productsRef = ref(db, "products");

class ProductService {
  onProductsChanged(callback) {
    onValue(productsRef, (snapshot) => {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        products.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      if (typeof callback === 'function') {
        callback(products);
      } else {
        console.error('onProductsChanged: Callback is not a function:', callback);
      }
    }, (error) => {
      console.error("onProductsChanged: Ma'lumot olishda xato:", error);
    });
  }

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
    const result = Array.from(categories);
    return result;
  }

  getAllProducts(callback) {
    if (typeof callback !== 'function') {
      console.error('getAllProducts: Callback is not a function:', callback);
      return;
    }
    onValue(productsRef, (snapshot) => {
      const products = [];
      snapshot.forEach((childSnapshot) => {
        const productData = childSnapshot.val();
        if (productData && typeof productData === 'object') {
          const product = { id: childSnapshot.key, ...productData };
          products.push(product);
        } else {
          console.warn('getAllProducts: Noto\'g\'ri mahsulot ma\'lumoti ID uchun:', childSnapshot.key);
        }
      });
      if (products.length === 0) {
        console.warn("getAllProducts: Hech qanday mahsulot topilmadi");
      }
      callback(products);
    }, (error) => {
      console.error("getAllProducts: Ma'lumot olishda xato:", error);
    });
  }

  async addProduct(productData) {
    try {
      const newProductRef = push(productsRef);
      await set(newProductRef, {
        ...productData,
        price: Number(productData.price) || 0, // Narxni raqamga aylantirish, agar bo‘sh bo‘lsa 0
      });
      const addedProduct = { id: newProductRef.key, ...productData };
      return addedProduct;
    } catch (error) {
      console.error("addProduct: Mahsulot qo‘shishda xato:", error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    try {
      const productRef = ref(db, `products/${id}`);
      await update(productRef, productData);
      const updatedProduct = { id, ...productData };
      return updatedProduct;
    } catch (error) {
      console.error("updateProduct: Mahsulot yangilashda xato:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const productRef = ref(db, `products/${id}`);
      await remove(productRef);
      return true;
    } catch (error) {
      console.error("deleteProduct: Mahsulot o‘chirishda xato:", error);
      throw error;
    }
  }

  searchProducts(searchTerm, category) {
    let products = [];
    onValue(productsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const product = { id: childSnapshot.key, ...childSnapshot.val() };
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === "Barchasi" || product.category === category;
        if (matchesSearch && matchesCategory) {
          products.push(product);
        }
      });
    });
    return products;
  }
}

export default new ProductService();