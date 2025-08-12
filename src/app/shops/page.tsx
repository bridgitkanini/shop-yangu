"use client";
import { useState, useEffect } from "react";
import { shopService } from "@/services/api";
import { Shop } from "@/types";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Image from "next/image";

interface ShopFormData {
  id?: string | number;
  name: string;
  description: string;
  logo: File | string | null;
  logoPreview?: string;
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ShopFormData>({
    id: undefined,
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
      console.error("Error fetching shops:", err);
      setError("Failed to fetch shops");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const shopData: Partial<Shop> = {
        name: formData.name,
        description: formData.description,
      };

      if (formData.logo instanceof File) {
        shopData.logo = URL.createObjectURL(formData.logo);
      } else if (formData.logo) {
        shopData.logo = formData.logo;
      }

      if (isEditMode && formData.id) {
        const shopId = formData.id.toString();
        const updatedShop = await shopService.updateShop(shopId, shopData);
        setShops(
          shops.map((shop) => (shop.id === formData.id ? updatedShop : shop))
        );
      } else {
        const newShop = await shopService.addShop(shopData as Omit<Shop, "id">);
        setShops([...shops, newShop]);
      }

      closeModal();
    } catch (err) {
      console.error(`Error ${isEditMode ? "updating" : "adding"} shop:`, err);
      setError(`Failed to ${isEditMode ? "update" : "add"} shop`);
    }
  };

  const handleEdit = (shop: Shop) => {
    setFormData({
      id: shop.id,
      name: shop.name,
      description: shop.description,
      logo: shop.logo,
      logoPreview: shop.logo || undefined,
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setFormData({
      id: undefined,
      name: "",
      description: "",
      logo: null,
      logoPreview: undefined,
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      try {
        await shopService.deleteShop(id.toString());
        setShops(shops.filter((shop) => shop.id !== id));
      } catch (err) {
        console.error("Error deleting shop:", err);
        setError("Failed to delete shop");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      });
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <main className="bg-gradient-to-br from-white to-[#1d4268] px-4 md:px-14 py-8 md:py-20">
      {/* Main content */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#041c4c]">Shops</h1>
          <button
            onClick={openAddModal}
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
                    <Image
                      src={shop.logo}
                      alt={`${shop.name} logo`}
                      width={200}
                      height={200}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="flex justify-between items-center gap-4 mt-4 text-sm">
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        (window.location.href = `/shops/${shop.id}`)
                      }
                      className="flex items-center gap-2 text-[#4ebcbe] hover:text-[#041c4c]"
                    >
                      <FaEye size={10} /> View
                    </button>
                    <button
                      onClick={() => handleEdit(shop)}
                      className="flex items-center gap-2 text-[#4ebcbe] hover:text-[#041c4c]"
                    >
                      <FaEdit size={10} /> Edit
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(shop.id!)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={10} /> Delete
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
              onClick={openAddModal}
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
                {isEditMode ? "Edit Shop" : "Add New Shop"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="shopName"
                      className="block text-sm font-medium text-[#1d4268] mb-1"
                    >
                      Shop Name
                    </label>
                    <input
                      id="shopName"
                      type="text"
                      required
                      className="w-full p-2 border rounded-lg"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
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
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                  <label
                    htmlFor="shopLogo"
                    className="block text-sm font-medium text-[#1d4268] mb-1"
                  >
                    Shop Logo
                  </label>
                  <input
                    id="shopLogo"
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#4ebcbe] rounded-md hover:bg-[#3aa8aa]"
                  >
                    {isEditMode ? "Update Shop" : "Add Shop"}
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
