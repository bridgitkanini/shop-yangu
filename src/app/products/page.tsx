"use client";
import { useState, useEffect } from "react";
import { shopService, productService } from "@/services/api";
import { Shop, Product } from "@/types";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaStore,
  FaBoxOpen,
  FaExclamationTriangle,
} from "react-icons/fa";
import Image from "next/image";

interface ProductWithShop extends Product {
  shopId: string | number;
  shopName: string;
}

interface ProductFormData {
  id?: number;
  name: string;
  price: number;
  stockLevel: number;
  description: string;
  image: File | null;
  shopId: string;
}

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductWithShop[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductWithShop | null>(
    null
  );
  const [filterShop, setFilterShop] = useState<string>("all");
  const [filterStock, setFilterStock] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stockLevel: 0,
    description: "",
    image: null,
    shopId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const shopsData = await shopService.getShops();
      setShops(shopsData);

      // Flatten all products from all shops
      const allProducts: ProductWithShop[] = [];
      shopsData.forEach((shop) => {
        if (shop.products) {
          shop.products.forEach((product) => {
            allProducts.push({
              ...product,
              shopId: shop.id!,
              shopName: shop.name,
            });
          });
        }
      });
      setProducts(allProducts);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const productData: Product = {
        id: editingProduct ? editingProduct.id : Date.now(),
        name: formData.name,
        price: formData.price,
        stockLevel: formData.stockLevel,
        description: formData.description,
        image: formData.image ? URL.createObjectURL(formData.image) : null,
      };

      if (editingProduct) {
        // Update existing product
        await productService.updateProduct(formData.shopId, productData);
      } else {
        // Add new product
        await productService.addProduct(formData.shopId, productData);
      }

      await fetchData(); // Refresh data
      resetForm();
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Failed to save product");
    }
  };

  const handleEdit = (product: ProductWithShop) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      stockLevel: product.stockLevel,
      description: product.description,
      image: null,
      shopId: product.shopId.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (product: ProductWithShop) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await productService.deleteProduct(
          product.shopId.toString(),
          product.id!.toString()
        );
        await fetchData(); // Refresh data
      } catch (err) {
        console.error("Error deleting product:", err);
        setError("Failed to delete product");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      stockLevel: 0,
      description: "",
      image: null,
      shopId: "",
    });
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const getStockStatus = (stockLevel: number) => {
    if (stockLevel === 0)
      return {
        status: "Out of Stock",
        color: "text-red-500",
        bgColor: "bg-red-100",
      };
    if (stockLevel <= 5)
      return {
        status: "Low Stock",
        color: "text-orange-500",
        bgColor: "bg-orange-100",
      };
    return {
      status: "In Stock",
      color: "text-green-500",
      bgColor: "bg-green-100",
    };
  };

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shopName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesShop =
      filterShop === "all" || product.shopId.toString() === filterShop;

    const matchesStock =
      filterStock === "all" ||
      (filterStock === "inStock" && product.stockLevel > 5) ||
      (filterStock === "lowStock" &&
        product.stockLevel > 0 &&
        product.stockLevel <= 5) ||
      (filterStock === "outOfStock" && product.stockLevel === 0);

    return matchesSearch && matchesShop && matchesStock;
  });

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stockLevel,
    0
  );
  const inStockCount = products.filter((p) => p.stockLevel > 5).length;
  const lowStockCount = products.filter(
    (p) => p.stockLevel > 0 && p.stockLevel <= 5
  ).length;
  const outOfStockCount = products.filter((p) => p.stockLevel === 0).length;

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <main className="bg-gradient-to-br from-white to-[#1d4268] p-4 md:p-14 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-[#041c4c]">All Products</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#4ebcbe] text-white px-4 py-2 rounded-lg hover:bg-[#1d4268] transition-colors"
          >
            Add Product
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1d4268] text-sm">Total Products</p>
                <p className="text-2xl font-bold text-[#041c4c]">
                  {totalProducts}
                </p>
              </div>
              <FaBoxOpen className="text-[#4ebcbe] text-2xl" />
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1d4268] text-sm">Total Value</p>
                <p className="text-2xl font-bold text-[#041c4c]">
                  KSh {totalValue.toLocaleString()}
                </p>
              </div>
              <FaStore className="text-[#4ebcbe] text-2xl" />
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {inStockCount}
                </p>
              </div>
              <div className="text-green-600 text-2xl">✓</div>
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm">Low/Out Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {lowStockCount + outOfStockCount}
                </p>
              </div>
              <FaExclamationTriangle className="text-red-600 text-2xl" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 p-4 rounded-xl shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="searchProducts"
                className="block text-sm font-medium text-[#1d4268] mb-1"
              >
                Search
              </label>
              <input
                id="searchProducts"
                type="text"
                placeholder="Search products..."
                className="w-full p-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="shopFilter"
                className="block text-sm font-medium text-[#1d4268] mb-1"
              >
                Filter by Shop
              </label>
              <select
                id="shopFilter"
                className="w-full p-2 border rounded-lg"
                value={filterShop}
                onChange={(e) => setFilterShop(e.target.value)}
              >
                <option value="all">All Shops</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="stockFilter"
                className="block text-sm font-medium text-[#1d4268] mb-1"
              >
                Filter by Stock
              </label>
              <select
                id="stockFilter"
                className="w-full p-2 border rounded-lg"
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
              >
                <option value="all">All Stock Levels</option>
                <option value="inStock">In Stock</option>
                <option value="lowStock">Low Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterShop("all");
                  setFilterStock("all");
                }}
                className="w-full p-2 text-[#1d4268] border rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stockLevel);
              return (
                <div
                  key={`${product.shopId}-${product.id}`}
                  className="bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-[#041c4c] mb-1">
                        {product.name}
                      </h3>
                      <p className="text-[#1d4268] text-sm mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#4ebcbe]">
                        <FaStore size={12} />
                        <span>{product.shopName}</span>
                      </div>
                    </div>
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-16 h-16 object-cover rounded-lg ml-4"
                      />
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#1d4268] text-sm">Price:</span>
                      <span className="font-semibold text-[#041c4c]">
                        KSh {product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#1d4268] text-sm">Stock:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bgColor} ${stockStatus.color}`}
                      >
                        {product.stockLevel} units
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#1d4268] text-sm">Value:</span>
                      <span className="font-semibold text-[#041c4c]">
                        KSh{" "}
                        {(product.price * product.stockLevel).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4 text-sm">
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          (window.location.href = `/shops/${product.shopId}`)
                        }
                        className="flex items-center gap-2 text-[#4ebcbe] hover:text-[#041c4c]"
                      >
                        <FaEye size={10} /> View Shop
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex items-center gap-2 text-[#4ebcbe] hover:text-[#041c4c]"
                      >
                        <FaEdit size={10} /> Edit
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(product)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={10} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/80 rounded-xl">
            <p className="text-[#1d4268] text-lg mb-4">
              {searchTerm || filterShop !== "all" || filterStock !== "all"
                ? "No products match your filters"
                : "No products available yet"}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#4ebcbe] hover:text-[#041c4c]"
            >
              Add your first product
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-[#041c4c] mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium text-[#1d4268] mb-1"
                    >
                      Product Name
                    </label>
                    <input
                      id="productName"
                      type="text"
                      required
                      className="w-full p-2 border rounded-lg"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="productShop"
                      className="block text-sm font-medium text-[#1d4268] mb-1"
                    >
                      Shop
                    </label>
                    <select
                      id="productShop"
                      required
                      className="w-full p-2 border rounded-lg"
                      value={formData.shopId}
                      onChange={(e) =>
                        setFormData({ ...formData, shopId: e.target.value })
                      }
                    >
                      <option value="">Select a shop</option>
                      {shops.map((shop) => (
                        <option key={shop.id} value={shop.id}>
                          {shop.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="productPrice"
                        className="block text-sm font-medium text-[#1d4268] mb-1"
                      >
                        Price (KSh)
                      </label>
                      <input
                        id="productPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        className="w-full p-2 border rounded-lg"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="productStock"
                        className="block text-sm font-medium text-[#1d4268] mb-1"
                      >
                        Stock Level
                      </label>
                      <input
                        id="productStock"
                        type="number"
                        min="0"
                        required
                        className="w-full p-2 border rounded-lg"
                        value={formData.stockLevel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            stockLevel: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="productDescription"
                      className="block text-sm font-medium text-[#1d4268] mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="productDescription"
                      required
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="productImage"
                      className="block text-sm font-medium text-[#1d4268] mb-1"
                    >
                      Product Image
                    </label>
                    <input
                      id="productImage"
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFormData({
                            ...formData,
                            image: e.target.files[0],
                          });
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-[#1d4268] hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4ebcbe] text-white rounded-lg hover:bg-[#1d4268] transition-colors"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
