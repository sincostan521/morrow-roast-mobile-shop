/**
 * Dawn Ledger design system: editorial specialty-coffee commerce, paper-like
 * surfaces, DM Serif Display for story-led moments, and Inter for clear tasks.
 */
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Coffee,
  Filter,
  Leaf,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  origin: string;
  roast: string;
  notes: string;
  price: number;
  image?: string;
  tone?: string;
};

const heroImage = "/manus-storage/morrow-hero-morning-coffee_f63847c5.jpg";
const ethiopiaImage = "/manus-storage/morrow-product-ethiopia_edcfec8f.jpg";
const ritualImage = "/manus-storage/morrow-brew-ritual_d16a3e26.jpg";
const logoImage = "/manus-storage/morrow-logo-mark_baa48472.png";

const products: Product[] = [
  {
    id: "ethiopia-bloom",
    name: "Ethiopia Bloom",
    origin: "Gedeb, Ethiopia",
    roast: "Light roast",
    notes: "Apricot · bergamot · tea",
    price: 14,
    image: ethiopiaImage,
  },
  {
    id: "slow-morning",
    name: "Slow Morning",
    origin: "Huila, Colombia",
    roast: "Medium roast",
    notes: "Cocoa · red apple · almond",
    price: 13.5,
    image: ritualImage,
  },
  {
    id: "gentle-start",
    name: "The Gentle Start",
    origin: "Minas Gerais, Brazil",
    roast: "Medium-light",
    notes: "Toffee · orange · hazelnut",
    price: 12.5,
    tone: "warm",
  },
];

const formatPrice = (value: number) => `£${value.toFixed(2)}`;

export default function Home() {
  const [activeProduct, setActiveProduct] = useState<Product>(products[0]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("Ready when your kettle is.");

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart],
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const addToCart = (product: Product) => {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] ?? 0) + 1,
    }));
    setNotice(`${product.name} is in your cart.`);
  };

  const changeQuantity = (product: Product, amount: number) => {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[product.id] ?? 0) + amount);
      const next = { ...current };
      if (nextQuantity === 0) delete next[product.id];
      else next[product.id] = nextQuantity;
      return next;
    });
  };

  const jumpToShop = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const chooseProduct = (product: Product) => {
    setActiveProduct(product);
    document.getElementById("roast-detail")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Morrow & Roast home">
          <img src={logoImage} alt="" className="brand-mark" />
          <span>Morrow &amp; Roast</span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#shop" onClick={() => setMenuOpen(false)}>Coffee</a>
          <a href="#roast-detail" onClick={() => setMenuOpen(false)}>The guide</a>
          <a href="#ritual" onClick={() => setMenuOpen(false)}>Your ritual</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button search-button" type="button" aria-label="Search the shop" onClick={() => setNotice("Search is part of the next prototype iteration.")}> 
            <Search size={19} strokeWidth={1.8} />
          </button>
          <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartCount} items`}>
            <ShoppingBag size={19} strokeWidth={1.8} />
            <span>Cart</span>
            <b>{cartCount}</b>
          </button>
          <button className="icon-button menu-button" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <aside className="editorial-rail" aria-label="Editorial page rail">
        <div className="rail-index">M&amp;R<br /><span>01</span></div>
        <nav className="rail-links" aria-label="Editorial rail navigation">
          <a href="#top">Start</a>
          <a href="#shop">Shelf</a>
          <a href="#roast-detail">Roast</a>
          <a href="#ritual">Ritual</a>
        </nav>
        <button className="rail-cart" type="button" onClick={() => setCartOpen(true)} aria-label="Open shopping cart">
          <ShoppingBag size={16} /> <span>{cartCount}</span>
        </button>
      </aside>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="apricot-dot" /> Small batch, simply chosen</p>
          <h1>Find the roast that fits your morning.</h1>
          <p className="hero-description">Thoughtfully sourced coffees and uncomplicated guidance for the way you actually brew at home.</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={jumpToShop}>
              Shop coffee <ArrowRight size={18} />
            </button>
            <button className="text-link" type="button" onClick={() => setNotice("Brew quiz: begin with a light, medium, or deep roast preference.")}>Take the 30-second brew quiz <ChevronRight size={16} /></button>
          </div>
          <p className="status-note" role="status"><Sparkles size={15} /> {notice}</p>
        </div>
        <div className="hero-visual">
          <img src={heroImage} alt="Freshly brewed coffee in gentle morning light" />
          <div className="hero-stamp" aria-hidden="true"><img src={logoImage} alt="" /></div>
          <div className="hero-caption"><span>01</span><p>For unhurried starts<br />and well-made pauses.</p></div>
        </div>
      </section>

      <section className="assurance-strip" aria-label="Morrow and Roast promises">
        <div><Leaf size={18} /><span>Thoughtful origins</span></div>
        <div><Coffee size={18} /><span>Roasted in small batches</span></div>
        <div><Check size={18} /><span>Easy, clear choices</span></div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-intro">
          <div>
            <p className="eyebrow">The coffee shelf</p>
            <h2>Start with the cup you want to make.</h2>
          </div>
          <div className="filter-note"><Filter size={17} /> Filter by roast, flavour, or brew method</div>
        </div>

        <div className="category-row" aria-label="Product categories">
          <button className="category-chip is-selected" type="button">Coffee</button>
          <button className="category-chip" type="button" onClick={() => setNotice("Sample packs are coming soon.")}>Sample packs</button>
          <button className="category-chip" type="button" onClick={() => setNotice("Filters are coming soon.")}>Filters</button>
          <button className="category-chip" type="button" onClick={() => setNotice("Brewing tools are coming soon.")}>Brewing tools</button>
        </div>

        <div className="shelf-rule" aria-hidden="true"><span>Selected for the shelf</span><i /></div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-tile" key={product.id}>
              <button className={`product-media ${product.tone ? "product-media-tone" : ""}`} type="button" onClick={() => chooseProduct(product)} aria-label={`View ${product.name}`}>
                {product.image ? <img src={product.image} alt="" /> : <div className="illustrated-bag"><span>M&amp;R</span><i /></div>}
                <span className="product-index">0{index + 1}</span>
              </button>
              <div className="product-body">
                <div className="product-meta"><span>{product.roast}</span><span>{product.origin}</span></div>
                <h3>{product.name}</h3>
                <p>{product.notes}</p>
                <div className="product-footer">
                  <strong>{formatPrice(product.price)}</strong>
                  <div className="product-actions">
                    <button className="detail-button" type="button" onClick={() => chooseProduct(product)}>Details</button>
                    <button className="quick-add" type="button" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}><Plus size={17} /></button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-section" id="roast-detail">
        <div className="detail-label"><span className="apricot-dot" /> Chosen for you</div>
        <div className="detail-layout">
          <div className="detail-title-wrap">
            <p className="eyebrow">The current roast</p>
            <h2>{activeProduct.name}</h2>
            <p className="detail-origin">{activeProduct.origin} · {activeProduct.roast}</p>
          </div>
          <div className="detail-copy">
            <p>Built for the part of your day that benefits from a little attention. Expect <strong>{activeProduct.notes.toLowerCase()}</strong> in a cup with clear sweetness and an easy finish.</p>
            <div className="selection-row">
              <div><span className="selection-label">Bag size</span><div className="selection-options"><button className="option is-active" type="button">250g</button><button className="option" type="button">500g</button></div></div>
              <div><span className="selection-label">Grind</span><div className="selection-options"><button className="option is-active" type="button">Whole bean</button><button className="option" type="button">Filter</button></div></div>
            </div>
            <div className="detail-cta-row">
              <div><span className="selection-label">Delivered Tue–Thu</span><strong>{formatPrice(activeProduct.price)}</strong></div>
              <button className="button button-primary" type="button" onClick={() => addToCart(activeProduct)}>Add to cart <Plus size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="ritual-section" id="ritual">
        <div className="ritual-image"><img src={ritualImage} alt="A carefully prepared pour-over coffee ritual" /></div>
        <div className="ritual-copy">
          <p className="eyebrow">Brew without the briefing</p>
          <h2>Good coffee does not need to feel complicated.</h2>
          <p>Choose a roast, select your grind, and leave the hard part to us. The Morrow &amp; Roast guide keeps the language clear, from your first bag to your fifth.</p>
          <button className="text-link text-link-dark" type="button" onClick={() => setNotice("Your brew guide is ready to explore.")}>Meet your brew guide <ArrowRight size={16} /></button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><img src={logoImage} alt="" /><span>Morrow &amp; Roast</span></div>
        <p className="footer-line">A better beginning,<br />brewed simply.</p>
        <div className="footer-stamp"><img src={logoImage} alt="" /><p>Make room<br />for morning.</p></div>
        <p className="prototype-note">Concept storefront for the BIB3103t Mobile Commerce assignment.</p>
      </footer>

      <div className={`cart-backdrop ${cartOpen ? "is-visible" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "is-open" : ""}`} aria-label="Shopping cart" aria-hidden={!cartOpen}>
        <div className="drawer-header"><div><p className="eyebrow">Your basket</p><h2>A good start.</h2></div><button className="icon-button" type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={21} /></button></div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty"><Coffee size={30} /><p>Your cart is waiting for a favourite roast.</p><button className="text-link text-link-dark" type="button" onClick={() => { setCartOpen(false); jumpToShop(); }}>Browse coffee <ArrowRight size={16} /></button></div>
          ) : cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-name"><strong>{item.name}</strong><span>250g · Whole bean</span></div>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
              <div className="quantity-control"><button type="button" aria-label={`Remove one ${item.name}`} onClick={() => changeQuantity(item, -1)}><Minus size={15} /></button><span>{item.quantity}</span><button type="button" aria-label={`Add one ${item.name}`} onClick={() => changeQuantity(item, 1)}><Plus size={15} /></button></div>
            </div>
          ))}
        </div>
        <div className="drawer-footer">
          <div className="cart-total"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          <p>Delivery is calculated at checkout.</p>
          <button className="button button-primary button-full" type="button" disabled={!cartItems.length} onClick={() => setNotice("Checkout is represented as a concept flow in this prototype.")}>Continue to checkout <ArrowRight size={18} /></button>
        </div>
      </aside>
    </main>
  );
}
