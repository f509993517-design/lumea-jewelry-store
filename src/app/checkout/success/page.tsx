"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutSuccess() {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id") || "");
    // Clear the local bag only after Stripe redirects to this success URL.
    // The server-side payment status should still be verified before fulfilling an order.
    if (params.get("session_id")) {
      localStorage.removeItem("fanvira-cart");
      window.dispatchEvent(new Event("cart-updated"));
    }
  }, []);

  return (
    <main className="page narrow">
      <p className="eyebrow">FANVIRA ORDER</p>
      <h1>Thank you for your order.</h1>
      <p>
        Stripe has returned you to FANVIRA. Please keep your Stripe receipt
        for your records. If you do not receive a confirmation email, contact
        us before placing another order.
      </p>
      {sessionId && (
        <p className="checkoutNote">
          Reference: {sessionId.slice(0, 18)}…
        </p>
      )}
      <Link href="/shop" className="button">Continue Shopping</Link>
    </main>
  );
}
