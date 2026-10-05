"use client";

import { useState } from "react";

type Product = {
  name: string;
  price: number;
  image: string;
  slug: string;
};

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    const stored = localStorage.getItem("fanvira-cart");

    const cart: (Product & { quantity: number })[] = stored
      ? JSON.parse(stored)
      : [];

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
  }

  return (
    <button
      className="addButton productAddButton"
      onClick={handleAddToCart}
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}