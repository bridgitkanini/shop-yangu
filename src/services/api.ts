import { Shop } from '@/types';

export const shopService = {
  async getShops() {
    const response = await fetch("/api/shops");
    if (!response.ok) {
      throw new Error("Failed to fetch shops");
    }
    return response.json();
  },

  async addShop(shopData: Shop) {
    const response = await fetch("/api/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopData),
    });
    if (!response.ok) {
      throw new Error("Failed to add shop");
    }
    return response.json();
  },

  async deleteShop(id: string) {
    const response = await fetch(`/api/shops/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete shop");
    }
  },
};
