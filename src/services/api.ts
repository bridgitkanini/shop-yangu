interface Shop {
  id?: string;
  name: string;
  description: string;
  logo: File | null;
}

export const shopService = {
  async getShops(): Promise<Shop[]> {
    // Implement your API call here
    const response = await fetch("/api/shops");
    if (!response.ok) {
      throw new Error("Failed to fetch shops");
    }
    return response.json();
  },

  async addShop(shopData: Shop): Promise<Shop> {
    // Implement your API call here
    const formData = new FormData();
    formData.append("name", shopData.name);
    formData.append("description", shopData.description);
    if (shopData.logo) {
      formData.append("logo", shopData.logo);
    }

    const response = await fetch("/api/shops", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add shop");
    }
    return response.json();
  },
};
