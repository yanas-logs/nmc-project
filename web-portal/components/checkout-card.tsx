"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { Button } from "./ui/button";

export default function CheckoutCard() {
  const handleCheckout = async (): Promise<void> => {
    const data = new FormData();
    data.set("uiMode", "hosted");
    const { url } = await createCheckoutSession(data);
    window.location.assign(url as string);
  };

  return <Button onClick={handleCheckout}>Checkout</Button>;
}
