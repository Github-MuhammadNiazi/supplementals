// Product Types
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  longDescription: string;
  benefits: string[];
  ingredients: string[];
  dosage: string;
  imageUrl: string;
  isBestSeller: boolean;
  stock: number;
}

export type ProductCategory =
  | "multivitamins"
  | "minerals"
  | "herbal"
  | "protein"
  | "omega"
  | "probiotics";

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

// Order Types
export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export type OrderStatus = "pending" | "inprogress" | "completed";

export interface Order {
  id: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  dateOfPurchase: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// Filter Types
export interface ProductFilters {
  category: ProductCategory | "all";
  priceRange: PriceRange;
  bestSellersOnly: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export type SortOption =
  | "price-low-high"
  | "price-high-low"
  | "alphabetical"
  | "best-sellers";

// Provider Auth
export interface ProviderCredentials {
  username: string;
  password: string;
}

// Order Filters
export interface OrderFilters {
  dateFrom: string;
  dateTo: string;
  status: OrderStatus | "all";
}
