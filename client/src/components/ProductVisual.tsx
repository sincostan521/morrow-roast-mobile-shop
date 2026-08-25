/** Dawn Ledger visual primitive: distinct editorial product imagery without repeated placeholder photography. */
import type { Product } from "@/lib/products";

export function ProductVisual({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`catalogue-visual visual-${product.visual} ${large ? "is-large" : ""}`}>
      {product.image ? (
        <img src={product.image} alt={`${product.name} coffee`} />
      ) : (
        <div className={`origin-visual origin-${product.visual}`} aria-label={`${product.name} coffee bag`}>
          <span className="origin-name">{product.origin.split(",")[0]}</span>
          <div className="coffee-bag">
            <span>M&amp;R</span>
            <i />
            <b>{product.roast}</b>
          </div>
          <em aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
