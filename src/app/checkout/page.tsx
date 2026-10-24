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

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fanvira-cart");
      if (!stored) return;
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setCart(
          parsed.filter(
            (item): item is CartItem =>
              item &&
              typeof item.slug === "string" &&
              typeof item.name === "string" &&
              typeof item.price === "number" &&
              typeof item.image === "string" &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0
          )
        );
      }
    } catch (readError) {
      console.error("Unable to read FANVIRA cart:", readError);
      setError("We couldn't read your bag. Please return to your cart and try again.");
    }
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  async function handleCheckout() {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart.map(({ slug, quantity }) => ({ slug, quantity })),
        }),
      });

      const data: { url?: string; error?: string } = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start secure checkout. Please try again.");
      }

      window.location.assign(data.url);
    } catch (checkoutError) {
      console.error("FANVIRA checkout failed:", checkoutError);
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start secure checkout. Please try again."
      );
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <main className="page narrow">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Your bag is empty.</h1>
        <p>Add a piece from the collection before continuing to checkout.</p>
        <Link href="/shop" className="button">Continue Shopping</Link>
        {error && <p role="alert">{error}</p>}
      </main>
    );
  }

  return (
    <main className="page checkoutPage">
      <p className="eyebrow">CHECKOUT</p>
      <h1>Complete your order.</h1>

      <div className="checkoutLayout">
        <section className="checkoutForm">
          <div className="checkoutSection">
            <p className="eyebrow">SECURE PAYMENT</p>
            <p>
              Continue to Stripe's secure checkout to enter your email,
              shipping details, and payment information. Your payment details
              are handled by Stripe.
            </p>
          </div>

          {error && (
            <p role="alert" aria-live="polite" className="checkoutError">
              {error}
            </p>
          )}

          <button
            type="button"
            className="button checkoutContinue"
            onClick={handleCheckout}
            disabled={loading || cart.length === 0}
          >
            {loading ? "Connecting to Secure Checkout…" : "Continue to Payment"}
          </button>

          <p className="checkoutNote">
            Prices are shown in USD. Shipping and applicable taxes may be
            calculated during checkout.
          </p>
        </section>

        <aside className="checkoutSummary">
          <p className="eyebrow">ORDER SUMMARY</p>

          {cart.map((item) => (
            <div className="checkoutItem" key={item.slug}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.quantity} × ${item.price.toFixed(2)}</p>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}

          <div className="summaryRow">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <div className="summaryRow">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summaryTotal">
            <span>Subtotal before shipping and taxes</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
