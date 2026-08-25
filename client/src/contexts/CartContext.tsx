/** Dawn Ledger interaction state: a small, transparent client-side cart for the prototype flow. */
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getProduct } from "@/lib/products";

export type CartLine = {
  productId: string;
  quantity: number;
  size: string;
  grind: string;
};

type CartContextValue = {
  lines: CartLine[];
  cartCount: number;
  subtotal: number;
  addItem: (productId: string, size?: string, grind?: string) => void;
  updateQuantity: (productId: string, amount: number, size: string, grind: string) => void;
  removeItem: (productId: string, size: string, grind: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem = (productId: string, size = "250g", grind = "Whole bean") => {
    setLines((current) => {
      const match = current.find((line) => line.productId === productId && line.size === size && line.grind === grind);
      if (match) {
        return current.map((line) => line === match ? { ...line, quantity: line.quantity + 1 } : line);
      }
      return [...current, { productId, quantity: 1, size, grind }];
    });
  };

  const updateQuantity = (productId: string, amount: number, size: string, grind: string) => {
    setLines((current) => current.flatMap((line) => {
      if (line.productId !== productId || line.size !== size || line.grind !== grind) return [line];
      const quantity = line.quantity + amount;
      return quantity > 0 ? [{ ...line, quantity }] : [];
    }));
  };

  const removeItem = (productId: string, size: string, grind: string) => {
    setLines((current) => current.filter((line) => line.productId !== productId || line.size !== size || line.grind !== grind));
  };

  const value = useMemo(() => {
    const cartCount = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce((total, line) => total + (getProduct(line.productId)?.price ?? 0) * line.quantity, 0);
    return { lines, cartCount, subtotal, addItem, updateQuantity, removeItem, clearCart: () => setLines([]) };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
