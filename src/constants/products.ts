export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  images?: string[];
  externalUrl: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  colors?: ProductColor[];
  sizes?: string[];
  inStock?: boolean;
  stockCount?: number;
}

export interface ProductColor {
  name: string;
  value: string;
  images: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Flag V-Neck T-Shirt",
    price: "₵150.00",
    originalPrice: "₵170.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764412550/ChatGPT_Image_Nov_29_2025_10_35_25_AM_lewh47.png",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764412550/ChatGPT_Image_Nov_29_2025_10_35_25_AM_lewh47.png",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764412550/ChatGPT_Image_Nov_29_2025_10_35_25_AM_lewh47.png",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764409979/ChatGPT_Image_Nov_19_2025_01_04_57_PM_burwtl.png",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "Flag V-Neck Outfit. Is a premium quality made with Ghana colors",
    colors: [],
    sizes: [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "2",
    name: "F-chest Ghana outfit",
    price: "₵1.00",
    originalPrice: "₵620.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764414584/ChatGPT_Image_Nov_29_2025_11_09_19_AM_macnnx.png",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764409980/photo_2025-11-29_09-52-13_iszsa9.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764409980/photo_2025-11-29_09-52-13_iszsa9.jpg",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "F-chest Ghana outfit. Is a premium quality made with Ghana colors",
    colors: [],
    sizes: [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "3",
    name: "Cheer Leader Outfit",
    price: "₵520.00",
    originalPrice: "₵620.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764413030/ChatGPT_Image_Nov_29_2025_10_42_49_AM_tjixga.png",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764412469/ChatGPT_Image_Nov_29_2025_10_32_47_AM_yiioqm.png",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764412469/ChatGPT_Image_Nov_29_2025_10_32_47_AM_yiioqm.png",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "Cheer Leader Outfit. Is a premium quality made with Ghana colors",
    colors: [],
    sizes: [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "4",
    name: "Keni Black NeoSuede",
    price: "₵520.00",
    originalPrice: "₵620.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764409979/photo_2025-11-29_09-52-10_vfiln9.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764409979/photo_2025-11-29_09-52-10_vfiln9.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764409979/photo_2025-11-29_09-52-10_vfiln9.jpg",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "Keni Black NeoSuede Ghana's golden craft. Durable, water proof, fade resistant, and easy to clean.",
    colors: [],
    sizes: [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
    ],
    inStock: true,
    stockCount: 15,
  },
  
];
