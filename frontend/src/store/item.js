import { create } from "zustand";

export const useItemStore = create((set) => ({
    items: [],
    setItems: (items) => set({ items }),
    createItem: async (newItem) => {
        if (!newItem.name || !newItem.price) {
            return { success: false, message: "Please fill in the name and the price." };
        }

        const res = await fetch("/api/items", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem),
        });

        const data = await res.json();
        set((state) => ({ items: [...state.items, data.data] }));
        return { success: true, message: "Item was created successfully." };
    },
    fetchItems: async () => {
        const res = await fetch("/api/items");
        const data = await res.json();
        set({ items: data.data });
    }
}))