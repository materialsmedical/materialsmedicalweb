"use client";

import { useState, useEffect } from "react";
import { Minus } from "lucide-react";

// Define Material interface
interface Material {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
}

// Main component
export default function Materials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  
  // Initialize cart as empty; will be populated in useEffect
  const [cart, setCart] = useState<Material[]>([]);
  
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch materials from the API
  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await fetch("/api/materials");
        if (!res.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data: Material[] = await res.json();
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    }
    fetchMaterials();
  }, []);

  // Load cart from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure window is defined
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error);
          setCart([]);
        }
      }
    }
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure window is defined
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Add item to the cart
  const addToCart = (item: Material) => {
    setCart((prevCart) => {
      const existingCart = [...prevCart];
      const itemIndex = existingCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (itemIndex !== -1) {
        existingCart[itemIndex].quantity! += 1;
      } else {
        existingCart.push({ ...item, quantity: 1 });
      }

      return existingCart;
    });
  };

  // Remove item from the cart
  const minusToCart = (item: Material) => {
    setCart((prevCart) => {
      const existingCart = [...prevCart];
      const itemIndex = existingCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (itemIndex !== -1) {
        const currentQuantity = existingCart[itemIndex].quantity!;
        if (currentQuantity > 1) {
          existingCart[itemIndex].quantity! -= 1;
        } else {
          existingCart.splice(itemIndex, 1);
        }
      }

      return existingCart;
    });
  };

  // Check if item is in the cart
  const isInCart = (id: string) => {
    return cart.find((item) => item.id === id);
  };

  // Render Search Bar
  const renderSearchBar = () => (
    <div className="relative mb-4">
      <label htmlFor="Search" className="sr-only">Search</label>
      <input
        type="text"
        id="Search"
        placeholder="Search for..."
        className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm focus:outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </div>
  );

  // Render Material Card
  const renderMaterialCard = (material: Material) => {
    const cartItem = isInCart(material.id);
    return (
      <div key={material.id} className="w-full relative border border-gray-300 bg-white my-6 p-6">
        <p className="text-gray-700 font-medium">{`${material.price} IQ`}</p>
        <h3 className="mt-1.5 text-2xl font-medium text-gray-900">{material.name}</h3>
        <p className="mt-1.5 text-gray-700">{material.description}</p>
        <br />
        <div className="flex items-center border border-gray-300 rounded-xl">
          <button
            className={`block w-full rounded px-4 py-3 text-sm font-medium text-gray-900 transition ${
              cartItem ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-300"
            }`}
            onClick={() => addToCart(material)}
          >
            {cartItem ? `Added (${cartItem.quantity})` : "Add to Cart"}
          </button>
          <button
            className="w-[64px] flex justify-center"
            onClick={() => minusToCart(material)}
            disabled={!cartItem} // Disable if item not in cart
          >
            <Minus />
          </button>
        </div>
      </div>
    );
  };

  // Filter materials based on the search query
  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state
  if (!materials.length) {
    return <div className="text-2xl flex justify-center mt-32">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[512px] p-4">
        {renderSearchBar()}
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map(renderMaterialCard)
        ) : (
          <div className="text-gray-500">No materials found.</div>
        )}
      </div>
    </div>
  );
}
