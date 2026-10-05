import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

const products = {
  "aurelia-hoops": {
    name: "Aurelia Hoops",
    price: 68,
  },
  "luna-chain": {
    name: "Luna Chain",
    price: 75,
  },
  "solace-ring": {
    name: "Solace Ring",
    price: 82,
  },
  "celeste-necklace": {
    name: "Celeste Necklace",
    price: 88,
  },
  "aria-studs": {
    name: "Aria Studs",
    price: 64,
  },
  "noa-bracelet": {
    name: "Noa Bracelet",
    price: 72,
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cart = body.cart;

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    const lineItems = cart.map((item) => {
      const product =
        products[item.slug as keyof typeof products];

      if (!product) {
        throw new Error("Invalid product.");
      }

      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        throw new Error("Invalid quantity.");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity,
      };
    });

    const origin =
      request.headers.get("origin") ||
      "https://lumea-jewelry-store-production.up.railway.app";

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        success_url:
          `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:
          `${origin}/checkout`,
      });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return NextResponse.json(
      {
        error: "Unable to create checkout session.",
      },
      { status: 500 }
    );
  }
}