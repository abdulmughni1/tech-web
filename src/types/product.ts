export interface ProductVariant {
  id: string;
  name: string;
  colorCode?: string;
  inStock: boolean;
  image?: string;
}

export interface TechSpecification {
  label: string;
  value: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  variantColor?: string;
}

export interface Product {
  id: string;
  itemNumber: number; // e.g. 1, 2, 3, 4, 6, 7, 8
  name: string;
  slug: string;
  category: 'Workspace' | 'Audio' | 'Wearables' | 'Smart Watches';
  shortStatement: string;
  description: string;
  detailedNotes?: string;
  originalPrice: number;
  salePrice: number;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: TechSpecification[];
  features: string[];
  packageContents?: string[];
  availability: 'in_stock' | 'limited_stock' | 'out_of_stock' | 'coming_soon';
  disclaimer?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  variantId: string;
  variantName: string;
  unitPrice: number;
  originalPrice: number;
  quantity: number;
  image: string;
  ringSize?: string;
}

export interface ShippingDetails {
  fee: number; // Fixed at 150
  coverage: string; // Nationwide across Pakistan
  returnWindowDays: number; // 7 days
}

export interface OrderFormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: 'meezan' | 'jazzcash' | 'easypaisa' | 'cod' | 'whatsapp';
}
