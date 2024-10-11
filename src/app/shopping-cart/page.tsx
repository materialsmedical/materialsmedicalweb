"use client";

import React, { useEffect, useState } from "react";

interface Material {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export default function Page() {
  const [cart, setCart] = useState<Material[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    socialAccount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const validateForm = () => {
    const { name, phone, socialAccount } = formData;
    if (!name || !phone || !socialAccount) {
      setError("All fields are required!");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const orderData = {
      ...formData,
      cartItems: cart,
      totalPrice,
    };

    setLoading(true);
    setError(null);

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit order.");
    }

    alert("Order submitted successfully!");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {cart.map((item) => (
        <div
          className="w-full max-w-[512px] h-12 flex justify-between rounded border border-gray-400 items-center p-4"
          key={item.id}
        >
          <div>{item.name}</div>
          <div>
            {item.price.toLocaleString()} IQ - ({item.quantity})
          </div>
        </div>
      ))}

      <div className="w-full max-w-[512px] mt-4">
        <hr />
      </div>

      <div className="w-full max-w-[512px] my-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-md border border-gray-200 p-4 shadow-sm sm:text-sm focus:outline-none"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full rounded-md border border-gray-200 p-4 shadow-sm sm:text-sm focus:outline-none"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Insta, Telegram account"
          className="w-full rounded-md border border-gray-200 p-4 shadow-sm sm:text-sm focus:outline-none"
          value={formData.socialAccount}
          onChange={(e) =>
            setFormData({ ...formData, socialAccount: e.target.value })
          }
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="w-full max-w-[512px] flex justify-between items-center">
        <div className="w-[128px]">
          <button
            className="w-full rounded px-4 py-3 text-sm font-medium text-gray-900 border border-gray-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Requesting..." : "Request"}
          </button>
        </div>
        <div>Total: {totalPrice.toLocaleString()} IQ</div>
      </div>
    </div>
  );
}
