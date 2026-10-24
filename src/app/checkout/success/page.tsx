"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutSuccess() {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id") || "");
  }, []);

  return (
    <main className="page narrow">
      <p className="eyebrow">FANVIRA CHECKOUT</p>
      <h1>Thank you for shopping with FANVIRA.</h1>
      <p>
        If you completed payment, check your email for the receipt from Stripe.
        This return page alone does not verify payment or confirm that an order
        has been fulfilled. Please contact the store if you are unsure about
        your payment status.
      </p>
      {sessionId && (
        <p className="checkoutNote">
          Checkout reference: {sessionId.slice(0, 18)}…
        </p>
      )}
      <Link href="/shop" className="button">Continue Shopping</Link>
    </main>
  );
}
