/** Dawn Ledger cart page: an editable, low-friction review before checkout. */
import { Link } from "wouter";
import { ArrowRight, Coffee, Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice, getProduct } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Cart() {
  const { lines, subtotal, updateQuantity, removeItem } = useCart();
  const delivery = subtotal >= 30 || subtotal === 0 ? 0 : 3.5;

  return (
    <main className="route-shell cart-route"><SiteHeader />
      <section className="route-hero compact-route-hero"><p className="eyebrow"><span className="apricot-dot" /> Cart review</p><h1>Your basket, ready when you are.</h1><p>Edit quantity or grind before you continue. Nothing is hidden at this stage.</p></section>
      {lines.length === 0 ? (
        <section className="empty-route cart-empty-route"><div className="empty-stamp" aria-hidden="true"><img src="/manus-storage/morrow-logo-mark_baa48472.png" alt="" /></div><p className="eyebrow"><span className="apricot-dot" /> The basket is clear</p><Coffee size={38} /><h2>Start with a roast you are curious about.</h2><p className="empty-reassurance">Choose one bag to begin. Your selections stay visible and editable all the way to checkout.</p><Link href="/" className="button button-primary">Browse the coffee shelf <ArrowRight size={18} /></Link></section>
      ) : (
        <section className="cart-page-layout">
          <div className="cart-line-list">{lines.map((line) => {
            const product = getProduct(line.productId);
            if (!product) return null;
            return <article className="cart-page-line" key={`${line.productId}-${line.size}-${line.grind}`}><ProductVisual product={product} /><div className="cart-page-info"><p className="eyebrow">{product.roast}</p><h2>{product.name}</h2><p>{line.size} · {line.grind}</p><div className="line-actions"><div className="quantity-picker"><button type="button" onClick={() => updateQuantity(product.id, -1, line.size, line.grind)} aria-label={`Reduce ${product.name} quantity`}><Minus size={15} /></button><span>{line.quantity}</span><button type="button" onClick={() => updateQuantity(product.id, 1, line.size, line.grind)} aria-label={`Increase ${product.name} quantity`}><Plus size={15} /></button></div><button className="remove-link" type="button" onClick={() => removeItem(product.id, line.size, line.grind)}><Trash2 size={15} /> Remove</button></div></div><strong className="cart-line-price">{formatPrice(product.price * line.quantity)}</strong></article>;
          })}</div>
          <aside className="order-summary"><p className="eyebrow">Order summary</p><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Delivery</span><strong>{delivery === 0 ? "Free" : formatPrice(delivery)}</strong></div><div className="order-total"><span>Total</span><strong>{formatPrice(subtotal + delivery)}</strong></div><p className="summary-note">Delivery is free over £30. Your order is packed within one working day.</p><Link href="/checkout" className="button button-primary button-full">Continue to checkout <ArrowRight size={18} /></Link></aside>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
