/** Dawn Ledger checkout: a focused three-stage delivery, payment, and review flow. */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { formatPrice, getProduct } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type Step = "delivery" | "payment" | "review" | "confirmed";

export default function Checkout() {
  const { lines, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("delivery");
  const [orderTotal, setOrderTotal] = useState(0);
  const delivery = subtotal >= 30 ? 0 : 3.5;
  const total = subtotal + delivery;

  const moveToPayment = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setStep("payment"); };
  const moveToReview = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setStep("review"); };
  const placeOrder = () => { setOrderTotal(total); clearCart(); setStep("confirmed"); };

  if (lines.length === 0 && step !== "confirmed") {
    return <main className="route-shell"><SiteHeader /><section className="empty-route checkout-empty-route"><div className="empty-stamp" aria-hidden="true"><img src="/manus-storage/morrow-logo-mark_baa48472.png" alt="" /></div><p className="eyebrow"><span className="apricot-dot" /> Your next step</p><h1>Your checkout starts with a coffee.</h1><p className="empty-reassurance">Pick a roast from the shelf, then return to a clear three-step delivery, payment, and review flow.</p><Link href="/" className="button button-primary">Back to the shelf</Link></section><SiteFooter /></main>;
  }

  return (
    <main className="route-shell checkout-route"><SiteHeader />
      {step === "confirmed" ? (
        <section className="confirmation-panel"><CheckCircle2 size={58} /><p className="eyebrow">Order confirmed</p><h1>Thank you. A good morning is on its way.</h1><p>Your order reference is <strong>MR-1048</strong>. We will send delivery updates to your email address.</p><div className="confirmation-total"><span>Total paid</span><strong>{formatPrice(orderTotal)}</strong></div><Link href="/" className="button button-primary">Continue shopping <ArrowRight size={18} /></Link></section>
      ) : (
        <section className="checkout-layout">
          <div className="checkout-main">
            <Link href="/cart" className="back-link"><ArrowLeft size={16} /> Return to cart</Link>
            <div className="checkout-heading"><p className="eyebrow"><span className="apricot-dot" /> Checkout</p><h1>Complete your order without the detours.</h1></div>
            <div className="checkout-progress" aria-label="Checkout progress"><span className={step === "delivery" ? "is-current" : "is-complete"}>1<br /><b>Delivery</b></span><i /><span className={step === "payment" ? "is-current" : step === "review" ? "is-complete" : ""}>2<br /><b>Payment</b></span><i /><span className={step === "review" ? "is-current" : ""}>3<br /><b>Review</b></span></div>

            {step === "delivery" && <form className="checkout-form" onSubmit={moveToPayment}><h2>Where should we send it?</h2><div className="form-grid"><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Full name<input required placeholder="Your name" /></label><label className="form-wide">Address line<input required placeholder="18 Market Street" /></label><label>Town / city<input required placeholder="Bristol" /></label><label>Postcode<input required placeholder="BS1 1AA" /></label></div><label className="check-label"><input type="checkbox" /> Save these details for a future order</label><button className="button button-primary form-action" type="submit">Continue to payment <ArrowRight size={18} /></button></form>}
            {step === "payment" && <form className="checkout-form" onSubmit={moveToReview}><h2>How would you like to pay?</h2><div className="express-row"><button type="button" className="express-button">Apple Pay</button><button type="button" className="express-button">PayPal</button></div><p className="form-divider">or pay by card</p><div className="form-grid"><label className="form-wide">Card number<input required inputMode="numeric" placeholder="1234 5678 9012 3456" /></label><label>Expiry date<input required placeholder="MM / YY" /></label><label>Security code<input required inputMode="numeric" placeholder="CVC" /></label></div><p className="secure-note"><LockKeyhole size={15} /> Payment details are used only to complete this concept checkout flow.</p><button className="button button-primary form-action" type="submit">Continue to review <ArrowRight size={18} /></button></form>}
            {step === "review" && <div className="review-panel"><h2>One last look.</h2><div className="review-block"><span>Delivery to</span><strong>18 Market Street, Bristol BS1 1AA</strong><button type="button" onClick={() => setStep("delivery")}>Edit</button></div><div className="review-block"><span>Payment</span><strong>Card ending 3456</strong><button type="button" onClick={() => setStep("payment")}>Edit</button></div><div className="review-items">{lines.map((line) => { const product = getProduct(line.productId); return product ? <div key={`${line.productId}-${line.size}-${line.grind}`}><span>{product.name} × {line.quantity}</span><strong>{formatPrice(product.price * line.quantity)}</strong></div> : null; })}</div><label className="check-label"><input required type="checkbox" /> I agree to the terms of this concept checkout.</label><button className="button button-primary form-action" type="button" onClick={placeOrder}>Place order · {formatPrice(total)} <ArrowRight size={18} /></button></div>}
          </div>
          <aside className="checkout-summary"><p className="eyebrow">Order summary</p>{lines.map((line) => { const product = getProduct(line.productId); return product ? <div key={`${line.productId}-${line.size}-${line.grind}`}><span>{product.name} × {line.quantity}</span><strong>{formatPrice(product.price * line.quantity)}</strong></div> : null; })}<hr /><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Delivery</span><strong>{delivery === 0 ? "Free" : formatPrice(delivery)}</strong></div><div className="order-total"><span>Total</span><strong>{formatPrice(total)}</strong></div></aside>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
