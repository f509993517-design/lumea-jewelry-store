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

  useEffect(() => {
    const stored = localStorage.getItem("fanvira-cart");

    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="page narrow">
        <p className="eyebrow">CHECKOUT</p>

        <h1>Your bag is empty.</h1>

        <p>
          Add a piece from the collection before continuing
          to checkout.
        </p>

        <Link href="/shop" className="button">
          Continue Shopping
        </Link>
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
            <p className="eyebrow">CONTACT</p>

            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Your email address"
            />
          </div>

          <div className="checkoutSection">
            <p className="eyebrow">SHIPPING ADDRESS</p>

            <div className="formGrid">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" />
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" />
              </div>
            </div>

            <label htmlFor="address">Address</label>
            <input id="address" type="text" />

            <div className="formGrid">
              <div>
                <label htmlFor="city">City</label>
                <input id="city" type="text" />
              </div>

              <div>
                <label htmlFor="state">State / Region</label>
                <input id="state" type="text" />
              </div>
            </div>

            <div className="formGrid">
              <div>
                <label htmlFor="zip">ZIP / Postal Code</label>
                <input id="zip" type="text" />
              </div>

              <div>
                <label htmlFor="country">Country</label>
                <select id="country" defaultValue="US">
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </div>

          <button type="button" className="button checkoutContinue">
            Continue to Payment
          </button>
        </section>

        <aside className="checkoutSummary">
          <p className="eyebrow">ORDER SUMMARY</p>

          {cart.map((item) => (
            <div className="checkoutItem" key={item.slug}>
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>
                <p>
                  {item.quantity} × ${item.price}
                </p>
              </div>

              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="summaryRow">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <div className="summaryRow">
            <span>Shipping</span>
            <span>Calculated later</span>
          </div>

          <div className="summaryTotal">
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}