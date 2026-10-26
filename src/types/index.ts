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
  supportedFormFactors?: ("ATX" | "Micro-ATX" | "Mini-ITX")[];
  tdpWatts?: number;
  wattage?: number;
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
  shortDescription: string;
  description: string;
  image: string;
  gallery?: string[];
  inStock: boolean;
  stockCount?: number;
  badge?: "Bestseller" | "Hot Deal" | "Staff Pick" | "Flagship" | "Popular" | "Value Pick" | "Editor's Choice" | "Ultimate Flagship";
  fpsBenchmarks: FpsBenchmark[];
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
  components?: {
    cpu?: Product;
    gpu?: Product;
    motherboard?: Product;
    ram?: Product;
    storage?: Product;
    cooler?: Product;
    psu?: Product;
    case?: Product;
  };
  includedComponentIds?: string[];
  warrantyYears: number;
  estimatedBuildTimeHours?: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  iconName?: string;
  featuredBadge?: string;
  featuredBrands?: string[];
}

export type CategoryItem = CategoryInfo;

export interface CartItem {
  id: string;
  product: Product | PCBuild;
  quantity: number;
  itemType: "product" | "prebuilt" | "custom_build";
  customBuildParts?: Record<string, Product | undefined>;
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
    postalCode?: string;
    orderNotes?: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "Order Confirmed" | "Received" | "Assembling" | "Stress-Testing" | "Dispatched" | "Delivered" | "Component Testing" | "Cable Management & Assembly" | "Stress Tested & Benchmarked" | "Dispatched via TCS";
  trackingNumber: string;
  paymentMethod: "bank_transfer" | "cod" | "easypaisa_jazzcash" | "card_demo";
  shippingMethod?: "standard_tcs" | "same_day_express";
  orderNotes?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currency: string;
  announcementBar: string;
  phone: string;
  whatsapp: string;
  email: string;
  addressLahore: string;
  addressKarachi: string;
  businessHours: string;
  demoAdminKey?: string;
  geminiConfigured?: boolean;
  demoModeNotice?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type FAQItem = FAQ;

export interface BuyingGuide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedDate?: string;
  date?: string;
  author: string;
  image: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  sources?: string[];
  suggestedActions?: { label: string; query?: string; href?: string }[];
}
