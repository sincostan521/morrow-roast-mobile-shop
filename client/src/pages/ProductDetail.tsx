/** Dawn Ledger product page: emphasis on clear variants, delivery reassurance, and one decisive action. */
import { useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { getProduct, products, formatPrice, logoImage } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function ProductDetail() {
  const [, params] = useRoute("/coffee/:id");
  const [, setLocation] = useLocation();
  const product = getProduct(params?.id ?? "");
  const { addItem } = useCart();
  const [size, setSize] = useState("250g");
  const [grind, setGrind] = useState("Whole bean");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <main className="route-shell"><SiteHeader /><section className="empty-route"><h1>That roast has moved on.</h1><Link href="/" className="button button-primary">Back to the shelf</Link></section></main>;
  }

  const addAndGoToCart = () => {
    for (let index = 0; index < quantity; index += 1) addItem(product.id, size, grind);
    setLocation("/cart");
  };

  return (
    <main className="route-shell detail-route">
      <SiteHeader />
      <section className="route-hero">
        <div className="route-stamp" aria-hidden="true"><img src={logoImage} alt="" /></div>
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back to the shelf</Link>
        <p className="eyebrow"><span className="apricot-dot" /> Single origin, clearly explained</p>
        <h1>{product.name}</h1>
        <p>{product.origin} · {product.roast}</p>
      </section>

      <section className="product-detail-layout">
        <div className="detail-visual-wrap"><ProductVisual product={product} large /></div>
        <div className="detail-buy-panel">
          <div className="detail-price-row"><div><span className="selection-label">Tasting notes</span><strong>{product.notes}</strong></div><strong className="big-price">{formatPrice(product.price)}</strong></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-fact"><Check size={17} /><span><strong>Best for:</strong> {product.bestFor}</span></div>

          <div className="variant-block"><span className="selection-label">Bag size</span><div className="selection-options"><button className={`option option-light ${size === "250g" ? "is-active" : ""}`} type="button" onClick={() => setSize("250g")}>250g</button><button className={`option option-light ${size === "500g" ? "is-active" : ""}`} type="button" onClick={() => setSize("500g")}>500g</button></div></div>
          <div className="variant-block"><span className="selection-label">Grind</span><div className="selection-options"><button className={`option option-light ${grind === "Whole bean" ? "is-active" : ""}`} type="button" onClick={() => setGrind("Whole bean")}>Whole bean</button><button className={`option option-light ${grind === "Filter" ? "is-active" : ""}`} type="button" onClick={() => setGrind("Filter")}>Filter</button><button className={`option option-light ${grind === "Espresso" ? "is-active" : ""}`} type="button" onClick={() => setGrind("Espresso")}>Espresso</button></div></div>

          <div className="purchase-row"><div className="quantity-picker"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Reduce quantity"><Minus size={16} /></button><span>{quantity}</span><button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={16} /></button></div><button className="button button-primary purchase-button" type="button" onClick={addAndGoToCart}>Add to cart <ShoppingBag size={18} /></button></div>
          <p className="delivery-reassurance">Usually dispatched within one working day. Free delivery on orders over £30.</p>
        </div>
      </section>

      <section className="related-section"><p className="eyebrow">Continue exploring</p><h2>Another good place to start.</h2><div className="related-links">{products.filter((item) => item.id !== product.id).slice(0, 3).map((item) => <Link key={item.id} href={`/coffee/${item.id}`}>{item.name} <span>{formatPrice(item.price)}</span></Link>)}</div></section>
      <SiteFooter />
    </main>
  );
}
