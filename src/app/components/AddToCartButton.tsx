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
  const [error, setError] = useState("");

  function handleAddToCart() {
    setError("");

    try {
      const stored = localStorage.getItem("fanvira-cart");
      let cart: CartItem[] = [];

      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          cart = parsed.filter(
            (item): item is CartItem =>
              item &&
              typeof item.slug === "string" &&
              typeof item.name === "string" &&
              typeof item.price === "number" &&
              typeof item.image === "string" &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0
          );
        }
      }

      const existing = cart.find((item) => item.slug === product.slug);

      if (existing) {
        if (existing.quantity >= 20) {
          setError("You can add up to 20 of this item.");
          return;
        }
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("fanvira-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cart-updated"));
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1800);
    } catch (error) {
      console.error("Add to cart failed:", error);
      setError("We couldn't add this item. Please check your browser settings and try again.");
    }
  }

  return (
    <div>
      <button
        type="button"
        className="addButton productAddButton"
        onClick={handleAddToCart}
      >
        {added ? "Added to Cart ✓" : "Add to Cart"}
      </button>
      {error && (
        <p role="alert" aria-live="polite" className="checkoutError">
          {error}
        </p>
      )}
    </div>
  );
}
