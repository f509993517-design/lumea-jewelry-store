"use client";

import { useState } from "react";

type Product = {
  name: string;
  price: number;
  image: string;
  slug: string;
};

type CartItem = Product & {
  quantity: number;
};

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    try {
      const stored = localStorage.getItem("fanvira-cart");

      let cart: CartItem[] = [];

      if (stored) {
        try {
          const parsed = JSON.parse(stored);

          if (Array.isArray(parsed)) {
            cart = parsed;
          }
        } catch {
          cart = [];
        }
      }

      const existing = cart.find(
        (item) => item.slug === product.slug
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "fanvira-cart",
        JSON.stringify(cart)
      );

      window.dispatchEvent(new Event("cart-updated"));

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 1800);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  }

  return (
    <button
      type="button"
      className="addButton productAddButton"
      onClick={handleAddToCart}
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}