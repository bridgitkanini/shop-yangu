"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { shopService, productService } from "@/services/api";
import { Shop, Product } from "@/types";
import { FaArrowLeft, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Image from "next/image";

interface ProductFormData {
  id?: number;
  name: string;
  price: number;
  stockLevel: number;
  description: string;
  image: File | null;
}

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shopId = params.id as string;

  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const [productFormData, setProductFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stockLevel: 0,
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchShopAndProducts();
  }, [shopId]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, filterBy, sortBy]);

  const fetchShopAndProducts = async () => {
    try {
      setIsLoading(true);
      const shopData = await shopService.getShop(shopId);
      setShop(shopData);
      setProducts(shopData.products || []);
    } catch (err) {
      console.error("Error fetching shop:", err);
      setError("Failed to fetch shop details");
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    if (filterBy === "in-stock") {
      filtered = filtered.filter((p) => p.stockLevel > 5);
    } else if (filterBy === "low-stock") {
      filtered = filtered.filter((p) => p.stockLevel > 0 && p.stockLevel <= 5);
    } else if (filterBy === "out-of-stock") {
      filtered = filtered.filter((p) => p.stockLevel === 0);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        case "stock":
          return b.stockLevel - a.stockLevel;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData: Product = {
        id: editingProduct?.id,
        name: productFormData.name,
        price: productFormData.price,
        stockLevel: productFormData.stockLevel,
        description: productFormData.description,
        image: productFormData.image
          ? URL.createObjectURL(productFormData.image)
          : editingProduct?.image || null,
      };

      if (editingProduct) {
        // Update existing product
        await productService.updateProduct(shopId, productData);
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? productData : p))
        );
      } else {
        // Add new product
        const newProduct = await productService.addProduct(shopId, productData);
        setProducts([...products, newProduct]);
      }

      resetProductForm();
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Failed to save product");
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await productService.deleteProduct(shopId, productId.toString());
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      price: product.price,
      stockLevel: product.stockLevel,
      description: product.description,
      image: null,
    });
    setIsProductModalOpen(true);
  };

  const resetProductForm = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setProductFormData({
      name: "",
      price: 0,
      stockLevel: 0,
      description: "",
      image: null,
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-500" };
    if (stock <= 5) return { text: "Low Stock", color: "text-yellow-500" };
    return { text: "In Stock", color: "text-green-500" };
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!shop) return <div className="p-8 text-center">Shop not found</div>;

  return (
    <main className="bg-gradient-to-br from-white to-[#1d4268] p-4 md:p-14 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#4ebcbe] hover:text-[#041c4c] transition-colors"
          >
            <FaArrowLeft /> Back to Shops
          </button>
        </div>

        {/* Shop Info */}
        <div className="bg-white/90 rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-6">
            {shop.logo && (
              <Image
                src={shop.logo}
                alt={`${shop.name} logo`}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-[#041c4c] mb-2">
                {shop.name}
              </h1>
              <p className="text-[#1d4268] text-lg">{shop.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/90 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-2 border rounded-lg"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All Products</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>

              <select
                className="px-4 py-2 border rounded-lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="stock">Sort by Stock</option>
              </select>
            </div>

            <button
              onClick={() => setIsProductModalOpen(true)}
              className="flex items-center gap-2 bg-[#4ebcbe] text-white px-4 py-2 rounded-lg hover:bg-[#1d4268] transition-colors"
            >
              <FaPlus /> Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {currentProducts.map((product) => {
                const stockStatus = getStockStatus(product.stockLevel);
                return (
                  <div
                    key={product.id}
                    className="bg-white/90 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="font-semibold text-lg text-[#041c4c] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[#1d4268] text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-[#4ebcbe]">
                        KSh {product.price.toLocaleString()}
                      </span>
                      <span
                        className={`text-sm font-medium ${stockStatus.color}`}
                      >
                        {stockStatus.text} ({product.stockLevel})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex items-center gap-2 text-[#4ebcbe] hover:text-[#041c4c] transition-colors"
                      >
                        <FaEdit size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id!)}
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash size={12} /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mb-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-[#4ebcbe] text-white"
                          : "bg-white/90 text-[#1d4268] hover:bg-[#4ebcbe] hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white/90 rounded-xl">
            <p className="text-[#1d4268] text-lg mb-4">
              {searchTerm || filterBy !== "all"
                ? "No products found matching your criteria"
                : "No products available yet"}
            </p>
            <button
              onClick={() => setIsProductModalOpen(true)}
              className="text-[#4ebcbe] hover:text-[#041c4c] transition-colors"
            >
              Add your first product
            </button>
          </div>
        )}

        {/* Product Modal */}
        {isProductModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-[#041c4c] mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <form onSubmit={handleProductSubmit}>
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
                      value={productFormData.name}
                      onChange={(e) =>
                        setProductFormData({
                          ...productFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
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
                      required
                      min="0"
                      className="w-full p-2 border rounded-lg"
                      value={productFormData.price}
                      onChange={(e) =>
                        setProductFormData({
                          ...productFormData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="stockLevel"
                      className="block text-sm font-medium text-[#1d4268] mb-1"
                    >
                      Stock Level
                    </label>
                    <input
                      id="stockLevel"
                      type="number"
                      required
                      min="0"
                      className="w-full p-2 border rounded-lg"
                      value={productFormData.stockLevel}
                      onChange={(e) =>
                        setProductFormData({
                          ...productFormData,
                          stockLevel: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-[#1d4268] mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      required
                      className="w-full p-2 border rounded-lg"
                      rows={3}
                      value={productFormData.description}
                      onChange={(e) =>
                        setProductFormData({
                          ...productFormData,
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
                          setProductFormData({
                            ...productFormData,
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
                    onClick={resetProductForm}
                    className="px-4 py-2 text-[#1d4268] hover:text-[#041c4c] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4ebcbe] text-white rounded-lg hover:bg-[#1d4268] transition-colors"
                  >
                    {editingProduct ? "Update" : "Add"} Product
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
