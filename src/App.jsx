"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ShoppingCart,
  Printer,
  Trash2,
  Plus,
  Minus,
  Settings,
} from "lucide-react";
import productService from "./services/productService";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState(productService.getAllProducts());

  // Mahsulotlarni yangilash
  const refreshProducts = () => {
    setProducts(productService.getAllProducts());
  };

  // Kategoriyalar ro'yxati
  const categories = useMemo(() => {
    return productService.getCategories();
  }, [products]);

  // Filtrlangan mahsulotlar
  const filteredProducts = useMemo(() => {
    return productService.searchProducts(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory, products]);

  // Savatga qo'shish
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            unit: product.unit,
            total: product.price,
          },
        ];
      }
    });
  };

  // Miqdorni o'zgartirish
  const updateQuantity = (id, change) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + change);
            if (newQuantity === 0) {
              return null;
            }
            return {
              ...item,
              quantity: newQuantity,
              total: newQuantity * item.price,
            };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Savatdan o'chirish
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Savatni tozalash
  const clearCart = () => {
    setCart([]);
  };

  // Umumiy summa
  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  // Chek yaratish
  const generateReceipt = () => {
    if (cart.length === 0) return;

    const receipt = {
      id: Date.now().toString(),
      date: new Date().toLocaleString("uz-UZ"),
      items: [...cart],
      total: totalAmount,
    };

    setCurrentReceipt(receipt);
    setShowReceipt(true);
  };

  // Chek chop etish
  const printReceipt = () => {
    window.print();
  };

  // Yangi savdo
  const newSale = () => {
    setCart([]);
    setShowReceipt(false);
    setCurrentReceipt(null);
  };

  // Admin panelni ko'rsatish
  const handleShowAdmin = () => {
    setShowAdmin(true);
  };

  // Admin paneldan chiqish
  const handleBackFromAdmin = () => {
    setShowAdmin(false);
    refreshProducts();
  };

  // Admin panel
  if (showAdmin) {
    return <AdminPanel onBack={handleBackFromAdmin} />;
  }

  // Chek ko'rinishi
  if (showReceipt && currentReceipt) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 receipt">
          <div className="text-center mb-6">
            <h1 className="text-2xl">"IMKON QURILISH" QURILISH MOLLARI DO'KONI</h1>
            <p className="text-gray-600">Chek #{currentReceipt.id}</p>
            <p className="text-sm text-gray-500">{currentReceipt.date}</p>
          </div>

          <div className="border-t border-b border-gray-300 py-4 mb-4">
            {currentReceipt.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} {item.unit} × {item.price.toLocaleString()}{" "}
                    so'm
                  </p>
                </div>
                <p>{item.total.toLocaleString()} so'm</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-xl">
              JAMI: {currentReceipt.total.toLocaleString()} so'm
            </p>
          </div>
          <div>
          <p className="text-center" style={{marginBottom: "5px"}}>Xaridingiz uchun rahmat!</p>
          <p className="text-center" style={{marginBottom: "20px"}}>Tel: +998 88 655 88 58</p>
          </div>

          <div className="flex gap-2 no-print">
            <button
              onClick={printReceipt}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <Printer size={16} />
              Chop etish
            </button>
            <button
              onClick={newSale}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600"
            >
              Yangi savdo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Asosiy POS interfeysi
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-center text-blue-600">
              <img src="favicon.png" alt="logo" style={{display: "inline", marginRight: "30px"}}/>
            DO'KONINING SANTEXNIKA MOLLARI QISMI
            </h1>
            <button
              onClick={handleShowAdmin}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
            >
              <Settings size={16} />
              Boshqaruv
            </button>
          </div>

          {/* Qidiruv va filtr */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Mahsulot qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mahsulotlar ro'yxati */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                Mahsulotlar ({filteredProducts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    <h2 className="font-semibold text-xl mb-2">
                      {product.name}
                    </h2>
                    <p className="text-l text-gray-600 mb-2">
                      {product.category}
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      {product.price.toLocaleString()} so'm/{product.unit}
                    </p>
                    {product.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Savat */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart size={24} />
                  Savat ({cart.length})
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <h4 className="font-medium text-sm mb-2">{item.name}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-red-500 text-white w-10 h-10 rounded-md flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = Math.max(
                              1,
                              parseInt(e.target.value)
                            );
                            setCart((prev) =>
                              prev.map((cartItem) =>
                                cartItem.id === item.id
                                  ? {
                                      ...cartItem,
                                      quantity: newQuantity,
                                      total: newQuantity * cartItem.price,
                                    }
                                  : cartItem
                              )
                            );
                          }}
                          className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-green-500 text-white w-10 h-10 rounded-md flex items-center justify-center hover:bg-green-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.price.toLocaleString()} so'm/{item.unit}
                    </p>
                    <p className="font-bold text-blue-600">
                    {item.total? `JAMI: ${item.total?.toLocaleString()} so'm`: "Hali qiymat kiritilmadi"} 
                    </p>
                  </div>
                ))}
              </div>
              {cart.length === 0 && (
                <p className="text-gray-500 text-center py-8">Savat bo'sh</p>
              )}

              {cart.length > 0 && (
                <>
                  <div className="border-t pt-4 mb-4">
                    <p className="text-xl font-bold text-center">
                    {totalAmount? `JAMI: ${totalAmount?.toLocaleString()} so'm`: "Hali qiymat kiritilmadi"} 
                    </p>
                  </div>
                  <button
                    onClick={generateReceipt}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 font-bold"
                  >
                    CHEK CHIQARISH
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
