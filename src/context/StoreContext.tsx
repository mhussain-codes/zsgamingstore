"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Product,
  PCBuild,
  CategoryInfo,
  FAQItem,
  BuyingGuide,
  StoreSettings,
  CartItem,
  Order,
} from "@/types";
import {
  initialProducts,
  initialPCBuilds,
  initialCategories,
  initialFAQs,
  initialBuyingGuides,
  initialStoreSettings,
} from "@/data/initialData";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface StoreContextType {
  products: Product[];
  pcBuilds: PCBuild[];
  categories: CategoryInfo[];
  faqs: FAQItem[];
  guides: BuyingGuide[];
  settings: StoreSettings;
  cart: CartItem[];
  wishlist: string[];
  compareList: (Product | PCBuild)[];
  orders: Order[];
  customBuild: Record<string, Product | undefined>;
  toasts: ToastMessage[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;

  // Cart actions
  addToCart: (
    item: Product | PCBuild,
    quantity?: number,
    itemType?: "product" | "prebuilt" | "custom_build",
    customParts?: Record<string, Product>
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist actions
  toggleWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;

  // Compare actions
  addToCompare: (item: Product | PCBuild) => void;
  removeFromCompare: (itemId: string) => void;
  isInCompare: (itemId: string) => boolean;
  clearCompare: () => void;

  // Custom PC Builder actions
  setCustomBuildPart: (slot: string, part: Product | undefined) => void;
  clearCustomBuild: () => void;
  customBuildTotal: number;

  // Orders
  addOrder: (order: Order) => void;
  findOrder: (query: string) => Order | undefined;

  // Admin Data Management
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updatePCBuild: (build: PCBuild) => void;
  addPCBuild: (build: PCBuild) => void;
  deletePCBuild: (id: string) => void;
  updateFAQ: (faq: FAQItem) => void;
  addFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  updateGuide: (guide: BuyingGuide) => void;
  addGuide: (guide: BuyingGuide) => void;
  deleteGuide: (id: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: "zs_store_products_v1",
  BUILDS: "zs_store_builds_v1",
  FAQS: "zs_store_faqs_v1",
  GUIDES: "zs_store_guides_v1",
  SETTINGS: "zs_store_settings_v1",
  CART: "zs_store_cart_v1",
  WISHLIST: "zs_store_wishlist_v1",
  COMPARE: "zs_store_compare_v1",
  ORDERS: "zs_store_orders_v1",
  BUILDER: "zs_store_custom_builder_v1",
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [pcBuilds, setPCBuilds] = useState<PCBuild[]>(initialPCBuilds);
  const [categories] = useState<CategoryInfo[]>(initialCategories);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [guides, setGuides] = useState<BuyingGuide[]>(initialBuyingGuides);
  const [settings, setSettings] = useState<StoreSettings>(initialStoreSettings);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<(Product | PCBuild)[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customBuild, setCustomBuild] = useState<Record<string, Product | undefined>>({});
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedBuilds = localStorage.getItem(STORAGE_KEYS.BUILDS);
      if (savedBuilds) setPCBuilds(JSON.parse(savedBuilds));

      const savedFaqs = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (savedFaqs) setFaqs(JSON.parse(savedFaqs));

      const savedGuides = localStorage.getItem(STORAGE_KEYS.GUIDES);
      if (savedGuides) setGuides(JSON.parse(savedGuides));

      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCompare = localStorage.getItem(STORAGE_KEYS.COMPARE);
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        // Initial sample demo order for order tracking testing
        const sampleOrder: Order = {
          orderId: "ZS-78921",
          date: "2026-10-24",
          customer: {
            fullName: "Bilal Ahmed",
            email: "bilal.ahmed@example.com",
            phone: "+92 321 4455667",
            address: "House 14-B, Sector F-8/2",
            city: "Islamabad",
            province: "Islamabad Capital Territory",
            postalCode: "44000",
          },
          items: [
            {
              id: "order-item-1",
              itemType: "prebuilt",
              product: initialPCBuilds[0],
              quantity: 1,
            },
          ],
          subtotal: initialPCBuilds[0].price,
          shipping: 0,
          total: initialPCBuilds[0].price,
          paymentMethod: "bank_transfer",
          shippingMethod: "standard_tcs",
          status: "Stress Tested & Benchmarked",
          trackingNumber: "TCS-99841203-PK",
        };
        setOrders([sampleOrder]);
      }

      const savedBuilder = localStorage.getItem(STORAGE_KEYS.BUILDER);
      if (savedBuilder) setCustomBuild(JSON.parse(savedBuilder));
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    setIsInitialized(true);
  }, []);

  // Save changes to localStorage after initialization
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.BUILDS, JSON.stringify(pcBuilds));
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
      localStorage.setItem(STORAGE_KEYS.GUIDES, JSON.stringify(guides));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEYS.BUILDER, JSON.stringify(customBuild));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }, [products, pcBuilds, faqs, guides, settings, cart, wishlist, compareList, orders, customBuild, isInitialized]);

  // Toast notification system
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (
    item: Product | PCBuild,
    quantity = 1,
    itemType: "product" | "prebuilt" | "custom_build" = "product",
    customParts?: Record<string, Product>
  ) => {
    const existingIndex = cart.findIndex((c) => {
      if (itemType === "custom_build") return false;
      return c.product.id === item.id && c.itemType === itemType;
    });

    if (existingIndex > -1) {
      setCart((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      });
      showToast(`Updated "${item.name}" quantity in cart (${cart[existingIndex].quantity + quantity})`, "success");
    } else {
      const newItem: CartItem = {
        id: "cart-" + Date.now() + "-" + Math.random().toString(36).slice(2, 5),
        itemType,
        product: item,
        quantity,
        customBuildParts: customParts,
      };
      setCart((prev) => [...prev, newItem]);
      showToast(`Added "${item.name}" to cart`, "success");
    }
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((c) => c.id === cartItemId);
    setCart((prev) => prev.filter((c) => c.id !== cartItemId));
    if (item) {
      showToast(`Removed "${item.product.name}" from cart`, "info");
    }
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.id === cartItemId ? { ...c, quantity } : c))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => {
    const effectivePrice = item.product.salePrice ?? item.product.price;
    return total + effectivePrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (itemId: string) => {
    const exists = wishlist.includes(itemId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== itemId));
      showToast("Removed from wishlist", "info");
    } else {
      setWishlist((prev) => [...prev, itemId]);
      showToast("Added to wishlist", "success");
    }
  };

  const isInWishlist = (itemId: string) => wishlist.includes(itemId);

  // Compare operations (maximum 4 items)
  const addToCompare = (item: Product | PCBuild) => {
    if (compareList.some((c) => c.id === item.id)) {
      showToast("Item is already in comparison list", "info");
      return;
    }
    if (compareList.length >= 4) {
      showToast("You can compare up to 4 products at once", "error");
      return;
    }
    setCompareList((prev) => [...prev, item]);
    showToast(`Added "${item.name}" to compare list`, "success");
  };

  const removeFromCompare = (itemId: string) => {
    setCompareList((prev) => prev.filter((c) => c.id !== itemId));
    showToast("Removed item from compare", "info");
  };

  const isInCompare = (itemId: string) => compareList.some((c) => c.id === itemId);

  const clearCompare = () => setCompareList([]);

  // PC Builder operations
  const setCustomBuildPart = (slot: string, part: Product | undefined) => {
    setCustomBuild((prev) => {
      const next = { ...prev };
      if (!part) {
        delete next[slot];
      } else {
        next[slot] = part;
      }
      return next;
    });
    if (part) {
      showToast(`Selected ${part.name} for ${slot.toUpperCase()}`, "success");
    } else {
      showToast(`Cleared ${slot.toUpperCase()}`, "info");
    }
  };

  const clearCustomBuild = () => {
    setCustomBuild({});
    showToast("Custom build configurator reset", "info");
  };

  const customBuildTotal = Object.values(customBuild).reduce((sum, part) => {
    if (!part) return sum;
    return sum + (part.salePrice ?? part.price);
  }, 0);

  // Orders
  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const findOrder = (query: string) => {
    const clean = query.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.orderId.toUpperCase() === clean ||
        o.trackingNumber.toUpperCase() === clean
    );
  };

  // Admin CRUD actions
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Product "${updated.name}" updated successfully`, "success");
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`New product "${newProduct.name}" added`, "success");
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product "${target?.name || id}" deleted`, "info");
  };

  const updatePCBuild = (updated: PCBuild) => {
    setPCBuilds((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    showToast(`PC Build "${updated.name}" updated`, "success");
  };

  const addPCBuild = (newBuild: PCBuild) => {
    setPCBuilds((prev) => [newBuild, ...prev]);
    showToast(`New PC Build "${newBuild.name}" created`, "success");
  };

  const deletePCBuild = (id: string) => {
    setPCBuilds((prev) => prev.filter((b) => b.id !== id));
    showToast("PC build removed", "info");
  };

  const updateFAQ = (updated: FAQItem) => {
    setFaqs((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    showToast("FAQ updated", "success");
  };

  const addFAQ = (newFAQ: FAQItem) => {
    setFaqs((prev) => [...prev, newFAQ]);
    showToast("FAQ added", "success");
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast("FAQ deleted", "info");
  };

  const updateGuide = (updated: BuyingGuide) => {
    setGuides((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    showToast("Buying Guide updated", "success");
  };

  const addGuide = (newGuide: BuyingGuide) => {
    setGuides((prev) => [newGuide, ...prev]);
    showToast("Buying Guide published", "success");
  };

  const deleteGuide = (id: string) => {
    setGuides((prev) => prev.filter((g) => g.id !== id));
    showToast("Buying Guide removed", "info");
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast("Store settings saved", "success");
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setPCBuilds(initialPCBuilds);
    setFaqs(initialFAQs);
    setGuides(initialBuyingGuides);
    setSettings(initialStoreSettings);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.BUILDS);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.GUIDES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    showToast("All store data reset to default demo catalog", "info");
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        pcBuilds,
        categories,
        faqs,
        guides,
        settings,
        cart,
        wishlist,
        compareList,
        orders,
        customBuild,
        toasts,
        showToast,
        removeToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        toggleWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        setCustomBuildPart,
        clearCustomBuild,
        customBuildTotal,
        addOrder,
        findOrder,
        updateProduct,
        addProduct,
        deleteProduct,
        updatePCBuild,
        addPCBuild,
        deletePCBuild,
        updateFAQ,
        addFAQ,
        deleteFAQ,
        updateGuide,
        addGuide,
        deleteGuide,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
