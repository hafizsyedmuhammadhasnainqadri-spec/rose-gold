export type CurrencyCode = 'PKR' | 'USD' | 'CAD' | 'GBP' | 'AED' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateFromPKR: number; // multiplier from PKR to this currency
  format: (amount: number) => string;
}

export type ProductCategory = 'Shoulder Bags' | 'Tote Bags' | 'Crossbody Bags' | 'Evening Bags';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  shortDescription: string;
  detailedDescription: string;
  pricePKR: number;
  compareAtPricePKR: number;
  discountPercent: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  rating: number;
  reviewCount: number;
  dimensions: string;
  material: string;
  hardware: string;
  lining: string;
  careInstructions: string;
}

export interface BundleTier {
  id: string;
  title: string;
  tagline: string;
  quantity: number;
  discountPercent: number;
  isRecommended: boolean;
  badge?: string;
  savingsLabel: string;
}

export interface CartItem {
  id: string; // product.id + '-' + color.name
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  notes?: string;
}

export interface PlacedOrder {
  orderId: string;
  orderNumber: string;
  createdAt: string;
  customer: CheckoutFormData;
  items: CartItem[];
  subtotalPKR: number;
  bundleDiscountPKR: number;
  bundleTierName?: string;
  shippingPKR: number;
  totalPKR: number;
  currencyCode: CurrencyCode;
  currencyRate: number;
  totalInCurrency: number;
  paymentMethod: 'Cash on Delivery (COD)';
  estimatedDelivery: string;
  status: 'Confirmed (Demo)';
}
