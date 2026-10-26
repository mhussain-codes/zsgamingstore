export type ProductCategory =
  | "graphics-cards"
  | "processors"
  | "motherboards"
  | "memory"
  | "storage"
  | "cases"
  | "cooling"
  | "power-supplies"
  | "monitors"
  | "peripherals";

export interface ProductCompatibility {
  socket?: "AM5" | "AM4" | "LGA1700" | "LGA1851";
  ramType?: "DDR4" | "DDR5";
  ramSlots?: number;
  formFactor?: "ATX" | "Micro-ATX" | "Mini-ITX";
  tdpWatts?: number;
  recommendedPsuWatts?: number;
  gpuLengthMm?: number;
  maxGpuLengthMm?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  price: number;
  salePrice?: number;
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  inStock: boolean;
  stockCount: number;
  badge?: "Bestseller" | "Hot Deal" | "New" | "Featured" | "Top Pick";
  rating: number;
  reviewCount: number;
  specs: Record<string, string>;
  compatibility?: ProductCompatibility;
  seoTitle?: string;
  seoDescription?: string;
}

export interface FpsBenchmark {
  game: string;
  resolution: string;
  fps: number;
  settings: string;
}

export interface PCBuild {
  id: string;
  name: string;
  slug: string;
  tier: "budget" | "mid-range" | "enthusiast" | "extreme";
  price: number;
  salePrice?: number;
  badge?: "Popular" | "Value Pick" | "Editor's Choice" | "Ultimate Flagship";
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  inStock: boolean;
  specs: {
    cpu: string;
    gpu: string;
    motherboard: string;
    ram: string;
    storage: string;
    cooler: string;
    psu: string;
    case: string;
  };
  fpsBenchmarks: FpsBenchmark[];
  includedComponentIds: string[];
  warrantyYears: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  featuredBadge?: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  itemType: "product" | "prebuilt" | "custom_build";
  product: Product | PCBuild;
  quantity: number;
  customBuildParts?: {
    cpu?: Product;
    motherboard?: Product;
    ram?: Product;
    gpu?: Product;
    storage?: Product;
    cooler?: Product;
    psu?: Product;
    case?: Product;
    monitor?: Product;
    peripherals?: Product;
  };
}

export interface Order {
  orderId: string;
  date: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    orderNotes?: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "cod" | "bank_transfer" | "easypaisa_jazzcash" | "card_demo";
  shippingMethod: "standard_tcs" | "same_day_express";
  status: "Order Confirmed" | "Component Testing" | "Cable Management & Assembly" | "Stress Tested & Benchmarked" | "Dispatched via TCS" | "Delivered";
  trackingNumber: string;
}

export interface FAQItem {
  id: string;
  category: "Orders & Shipping" | "PC Builds & Testing" | "Warranty & Returns" | "Payments";
  question: string;
  answer: string;
}

export interface BuyingGuide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  content: string;
  tags: string[];
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  addressLahore: string;
  addressKarachi: string;
  businessHours: string;
  announcementBar: string;
  currency: string;
  geminiConfigured: boolean;
  demoModeNotice: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  sources?: string[];
  suggestedActions?: { label: string; href?: string; query?: string }[];
}
