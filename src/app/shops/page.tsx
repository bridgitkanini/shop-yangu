"use client";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shops, setShops] = useState([]);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    logo: File | null;
  }>({
    name: "",
    description: "",
    logo: null,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
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

        {/* No shops message */}
        {shops.length === 0 && (
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
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
    </div>
  );
}
