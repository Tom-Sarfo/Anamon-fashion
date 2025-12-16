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
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1765865942/Anamon_Fashion_Put_this_attire_in_the_attached_image_on_a_black_African_male_mod_7ae37944-7d41-4e91-8615-0a38fcf24211_gazcz1.png",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1765865942/Anamon_Fashion_Put_this_attire_in_the_attached_image_on_a_black_African_male_mod_7ae37944-7d41-4e91-8615-0a38fcf24211_gazcz1.png",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1765866001/photo_2025-12-12_02-50-12_m2ayph.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1765866001/photo_2025-12-12_02-50-08_eexwul.jpg",
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
    originalPrice: "₵20.00",
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
    name: "Flag V-Neck T-Shirt Ladies",
    price: "₵150.00",
    originalPrice: "₵300.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1765866001/photo_2025-12-12_02-50-24_clohhh.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1765866001/photo_2025-12-12_02-50-24_clohhh.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1765866092/Thomas_sarfo_Put_the_attire_in_image_1_on_the_model_in_image_2_a2716ea4-c60a-482c-ad78-186d0b48ee57_asttrf.png",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/c_crop,ar_3:4/v1765866002/photo_2025-12-12_02-52-20_jyxazg.jpg",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "Flag V-Neck T-Shirt Ladies. Is a premium quality made with Ghana colors",
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
    name: "Coming soon...",
    price: "₵0.00",
    originalPrice: "₵0.00",
    image: "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764584313/ChatGPT_Image_Dec_1_2025_10_18_11_AM_v23fpl.png",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1764584313/ChatGPT_Image_Dec_1_2025_10_18_11_AM_v23fpl.png",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
        "Coming soon... ",
      colors: [],
    sizes: [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
    ],
    inStock: false,
    stockCount: 15,
  },
  
];
