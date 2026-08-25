/** Dawn Ledger navigation: compact on mobile, editorial utility bar on larger screens. */
import { useState } from "react";
import { Link } from "wouter";
import { Menu, ShoppingBag, X } from "lucide-react";
import { logoImage } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="app-header">
      <Link href="/" className="app-brand" onClick={() => setOpen(false)}>
        <img src={logoImage} alt="" />
        <span className="wordmark">Morrow <i>&amp;</i> Roast</span>
      </Link>
      <nav className={`app-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        <Link href="/" onClick={() => setOpen(false)}>Coffee</Link>
        <a href="/#ritual" onClick={() => setOpen(false)}>The guide</a>
        <a href="/#ritual" onClick={() => setOpen(false)}>Your ritual</a>
      </nav>
      <div className="app-header-actions">
        <Link href="/cart" className="app-cart-link" aria-label={`Open cart with ${cartCount} items`}>
          <ShoppingBag size={18} /><span>Cart</span><b>{cartCount}</b>
        </Link>
        <button className="app-menu-button" type="button" onClick={() => setOpen((current) => !current)} aria-label="Toggle navigation">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
