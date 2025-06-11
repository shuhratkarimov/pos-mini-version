"use client"

// AdminPanel.jsx
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import ProductForm from "./ProductForm";
import productService from "../services/productService";

const AdminPanel = ({ onBack, refreshProducts }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    unit: "",
    description: "",
  });
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    productService.onProductsChanged(setProducts);
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDeleteProduct = async (product) => {
    if (window.confirm(`"${product.name}" mahsulotini o'chirishni xohlaysizmi?`)) {
      await productService.deleteProduct(product.id)
      refreshProducts()
    }
  }

  const handleSaveProduct = async () => {
    try {
      await productService.addProduct(productData);
      if (refreshProducts) refreshProducts();
      setProductData({ name: "", category: "", price: "", unit: "", description: "" });
    } catch (error) {
      console.error("Mahsulot saqlashda xato:", error);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Orqaga
              </button>
              <h1 className="text-3xl font-bold text-blue-600">MAHSULOTLAR BOSHQARUVI</h1>
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"
            >
              <Plus size={16} />
              Yangi mahsulot
            </button>
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-600">Jami mahsulotlar: {products.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">ID</th>
                  <th className="text-left py-3 px-2">Nomi</th>
                  <th className="text-left py-3 px-2">Kategoriya</th>
                  <th className="text-left py-3 px-2">Narxi</th>
                  <th className="text-left py-3 px-2">Birligi</th>
                  <th className="text-left py-3 px-2">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">{product.id}</td>
                    <td className="py-3 px-2 font-medium">{product.name}</td>
                    <td className="py-3 px-2 text-sm">{product.category}</td>
                    <td className="py-3 px-2 font-bold text-blue-600">{product.price.toLocaleString()} so'm</td>
                    <td className="py-3 px-2 text-sm">{product.unit}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                          title="Tahrirlash"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                          title="O'chirish"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={handleCancelForm} />}
    </div>
  )
}

export default AdminPanel
