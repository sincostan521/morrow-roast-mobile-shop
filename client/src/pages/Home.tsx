/** Dawn Ledger homepage: a mobile-first editorial coffee shelf with direct routes into product and cart tasks. */
import { ArrowRight, Check, ChevronRight, Coffee, Filter, Leaf, Plus, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { heroImage, logoImage, products, formatPrice, ritualImage } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  const { addItem } = useCart();
  const [notice, setNotice] = useState("Ready when your kettle is.");

  return (
    <main className="shop-shell">
      <SiteHeader />
      <aside className="editorial-rail" aria-label="Editorial page rail"><div className="rail-index">M&amp;R<br /><span>01</span></div><nav className="rail-links"><a href="#top">Start</a><a href="#shop">Shelf</a><a href="#ritual">Ritual</a></nav><Link className="rail-cart" href="/cart">Cart</Link></aside>
      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow"><span className="apricot-dot" /> Small batch, simply chosen</p><h1>Find the roast that fits your morning.</h1><p className="hero-description">Thoughtfully sourced coffees and uncomplicated guidance for the way you actually brew at home.</p><div className="hero-actions"><a className="button button-primary" href="#shop">Shop coffee <ArrowRight size={18} /></a><button className="text-link" type="button" onClick={() => setNotice("Start with a light, medium, or deeper roast preference.")}>Take the 30-second brew quiz <ChevronRight size={16} /></button></div><p className="status-note" role="status"><Sparkles size={15} /> {notice}</p></div>
        <div className="hero-visual"><img src={heroImage} alt="Freshly brewed coffee in gentle morning light" /><div className="hero-stamp" aria-hidden="true"><img src={logoImage} alt="" /></div><div className="hero-caption"><span>01</span><p>For unhurried starts<br />and well-made pauses.</p></div></div>
      </section>
      <section className="assurance-strip" aria-label="Morrow and Roast promises"><div><Leaf size={18} /><span>Thoughtful origins</span></div><div><Coffee size={18} /><span>Roasted in small batches</span></div><div><Check size={18} /><span>Easy, clear choices</span></div></section>

      <section className="shop-section" id="shop"><div className="section-intro"><div><p className="eyebrow">The coffee shelf</p><h2>Start with the cup you want to make.</h2></div><div className="filter-note"><Filter size={17} /> Eight considered coffees, one simple choice at a time</div></div><div className="category-row" aria-label="Product categories"><button className="category-chip is-selected" type="button">Coffee</button><button className="category-chip" type="button" onClick={() => setNotice("Sample packs are included in the expanded coffee shelf.")}>Sample packs</button><button className="category-chip" type="button" onClick={() => setNotice("Filters are part of the next range update.")}>Filters</button></div><div className="shelf-rule" aria-hidden="true"><span>Selected for the shelf</span><i /></div>
        <div className="expanded-product-grid">{products.map((product, index) => <article className={`catalogue-item ${index === 0 ? "is-featured" : ""}`} key={product.id}><Link href={`/coffee/${product.id}`} className="catalogue-link"><ProductVisual product={product} /><span className="product-index">{String(index + 1).padStart(2, "0")}</span>{index === 0 && <span className="feature-kicker">Editor’s first pour</span>}</Link><div className="catalogue-copy"><p className="product-meta">{product.roast} · {product.origin}</p><Link href={`/coffee/${product.id}`}><h3>{product.name}</h3></Link><p>{product.notes}</p><div><strong>{formatPrice(product.price)}</strong><button className="quick-add" type="button" onClick={() => { addItem(product.id); setNotice(`${product.name} is in your cart.`); }} aria-label={`Add ${product.name} to cart`}><Plus size={17} /></button></div></div></article>)}</div>
      </section>

      <section className="ritual-section" id="ritual"><div className="ritual-image"><img src={ritualImage} alt="A carefully prepared pour-over coffee ritual" /></div><div className="ritual-copy"><p className="eyebrow">Brew without the briefing</p><h2>Good coffee does not need to feel complicated.</h2><p>Choose a roast, select your grind, and leave the hard part to us. The Morrow &amp; Roast guide keeps the language clear, from your first bag to your fifth.</p><Link className="text-link text-link-dark" href="/coffee/first-three">Meet the First Three <ArrowRight size={16} /></Link></div></section>
      <SiteFooter />
    </main>
  );
}
