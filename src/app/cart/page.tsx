"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  name: string;
  price: number;
  image: string;
  slug: string;
  quantity: number;
};

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fanvira-cart");

    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }

    setLoaded(true);
  }, []);

  function updateCart(nextCart: CartItem[]) {
    setCart(nextCart);

    localStorage.setItem(
      "fanvira-cart",
      JSON.stringify(nextCart)
    );

    window.dispatchEvent(new Event("cart-updated"));
  }

  function increaseQuantity(slug: string) {
    const nextCart = cart.map((item) =>
      item.slug === slug
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(nextCart);
  }

  function decreaseQuantity(slug: string) {
    const nextCart = cart
      .map((item) =>
        item.slug === slug
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(nextCart);
  }

  function removeItem(slug: string) {
    const nextCart = cart.filter(
      (item) => item.slug !== slug
    );

    updateCart(nextCart);
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!loaded) {
    return (
      <main className="page narrow">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Loading your bag...</h1>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="page narrow">
        <p className="eyebrow">YOUR BAG</p>

        <h1>Your cart is ready.</h1>

        <p>
          Add pieces from the collection to begin your order.
        </p>

        <Link className="button" href="/shop">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="page cartPage">
      <p className="eyebrow">YOUR BAG</p>

      <h1>Your Cart</h1>

      <div className="cartLayout">
        <section className="cartItems">
          {cart.map((item) => (
            <article className="cartItem" key={item.slug}>
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cartItemInfo">
                <Link href={`/shop/${item.slug}`}>
                  <h3>{item.name}</h3>
                </Link>

                <p>${item.price}</p>

                <div className="quantityControls">
                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.slug)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.slug)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="removeButton"
                  onClick={() =>
                    removeItem(item.slug)
                  }
                >
                  Remove
                </button>
              </div>

              <p className="cartItemTotal">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </article>
          ))}
        </section>

        <aside className="cartSummary">
          <p className="eyebrow">ORDER SUMMARY</p>

          <div className="summaryRow">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <p className="shippingNote">
            Shipping and taxes calculated at checkout.
          </p>

          <Link
  href="/checkout"
  className="button checkoutButton"
>
  Checkout
</Link>

          <Link
            href="/shop"
            className="continueLink"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}