/** Dawn Ledger closing moment: a branded sign-off shared across shopping routes. */
import { logoImage } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-brand"><img src={logoImage} alt="" /><span className="wordmark">Morrow <i>&amp;</i> Roast</span></div>
      <p className="footer-line">A better beginning,<br />brewed simply.</p>
      <div className="footer-stamp"><img src={logoImage} alt="" /><p>Make room<br />for morning.</p></div>
      <p className="prototype-note">Concept storefront for the BIB3103t Mobile Commerce assignment.</p>
    </footer>
  );
}
