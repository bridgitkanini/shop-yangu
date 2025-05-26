// src/services/api.ts
export const shopService = {
  getShops: async () => {
    const res = await fetch("http://localhost:3001/shops");
    if (!res.ok) throw new Error("Failed to fetch shops");
    return res.json();
  },

  addShop: async (shopData: any) => {
    const res = await fetch("http://localhost:3001/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopData),
    });
    if (!res.ok) throw new Error("Failed to add shop");
    return res.json();
  },

  deleteShop: async (id: string) => {
    const res = await fetch(`http://localhost:3001/shops/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete shop");
    return res.json();
  },
};
