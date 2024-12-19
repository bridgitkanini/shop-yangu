"use client";
import { useState, useEffect } from "react";
import { shopService } from "@/services/api";
import { Shop } from "@/types";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

interface ShopFormData {
  id?: number;
  name: string;
  description: string;
  logo: File | null;
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ShopFormData>({
    name: "",
    description: "",
    logo: null,
  });

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setIsLoading(true);
      const data = await shopService.getShops();
      setShops(data);
    } catch (err) {
      setError("Failed to fetch shops");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // Convert File to string (usually a URL or base64) before sending to API
      const shopData: Shop = {
        name: formData.name,
        description: formData.description,
        logo: formData.logo ? URL.createObjectURL(formData.logo) : null,
      };

      const newShop = await shopService.addShop(shopData);
      setShops([...shops, newShop]);
      setIsModalOpen(false);
      setFormData({ name: "", description: "", logo: null });
    } catch (err) {
      setError("Failed to add shop");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await shopService.deleteShop(id.toString());
      setShops(shops.filter((shop) => shop.id !== id));
    } catch (err) {
      setError("Failed to delete shop");
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <main className="bg-gradient-to-br from-white to-[#1d4268] p-4 md:p-14">
      {/* Main content */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#041c4c]">Shops</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#4ebcbe] text-white px-4 py-2 rounded-lg hover:bg-[#1d4268] transition-colors"
          >
            Add Shop
          </button>
        </div>

        {/* Shop List */}
        {shops.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-[#041c4c]">
                      {shop.name}
                    </h3>
                    <p className="text-[#1d4268] mt-1">{shop.description}</p>
                  </div>
                  {shop.logo && (
                    <img
                      src={shop.logo}
                      alt={`${shop.name} logo`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => (window.location.href = `/shops/${shop.id}`)}
                    className="flex items-center gap-2 text-[#4ebcbe] hover:text-[#041c4c]"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 text-[#4ebcbe] hover:text-[#041c4c]"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(shop.id!)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/80 rounded-xl">
            <p className="text-[#1d4268] text-lg mb-4">
              No shops available yet
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[#4ebcbe] hover:text-[#041c4c]"
            >
              Add your first shop
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-8">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-[#041c4c] mb-4">
                Add New Shop
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1d4268] mb-1">
                      Shop Name
                    </label>
                    <input
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
                    <label className="block text-sm font-medium text-[#1d4268] mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      className="w-full p-2 border rounded-lg"
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
                    <label className="block text-sm font-medium text-[#1d4268] mb-1">
                      Shop Logo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => {
                        if (e.target.files) {
                          setFormData({ ...formData, logo: e.target.files[0] });
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-[#1d4268]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#4ebcbe] text-white rounded-lg hover:bg-[#1d4268]"
                  >
                    Add Shop
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
