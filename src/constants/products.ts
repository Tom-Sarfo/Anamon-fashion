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
    name: "Paaks Brown NeoSuede",
    price: "₵520.00",
    originalPrice: "₵620.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133417/photo_2025-11-07_07-45-58_xpuntp.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133417/photo_2025-11-07_07-45-58_xpuntp.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133417/photo_2025-11-07_07-44-38_f8at2c.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133417/photo_2025-11-07_07-46-08_yp9ea6.jpg",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "Paaks Brown NeoSuede Ghana's golden craft. Durable, water proof, fade resistant, and easy to clean.",
    colors: [],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "2",
    name: "Paaks Brown NeoSuede",
    price: "₵520.00",
    originalPrice: "₵620.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763136098/photo_2025-11-14_15-21-11_zrypwh.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763136098/photo_2025-11-14_15-21-11_zrypwh.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133417/photo_2025-11-07_07-46-32_pgndnp.jpg",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "Paaks Black NeoSuede Ghana's golden craft. Durable, water proof, fade resistant, and easy to clean.",
    colors: [],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "3",
    name: "Paaks Grey NeoSuede",
    price: "₵520.00",
    originalPrice: "₵620.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133417/photo_2025-11-07_07-46-21_lcjr8g.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133417/photo_2025-11-07_07-46-21_lcjr8g.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133417/photo_2025-11-07_07-46-21_lcjr8g.jpg",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "Paaks Grey NeoSuede Ghana's golden craft. Durable, water proof, fade resistant, and easy to clean.",
    colors: [],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
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
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763142075/photo_2025-11-14_15-19-53_ell6ag.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763142075/photo_2025-11-14_15-19-53_ell6ag.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763142075/photo_2025-11-14_15-18-42_nmkuci.jpg",
    ],
    externalUrl: "",
    rating: 5.0,
    reviewCount: 124,
    description:
      "Keni Black NeoSuede Ghana's golden craft. Durable, water proof, fade resistant, and easy to clean.",
    colors: [],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "5",
    name: "African Brown NeoSuede",
    price: "₵520.00",
    originalPrice: "₵620.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133789/photo_2025-11-14_15-18-16_ze5uzi.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763142450/photo_2025-11-14_15-19-32_k4kdk7.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763142075/photo_2025-11-14_15-18-16_wnznc0.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1763133790/photo_2025-11-14_15-18-51_v2jgut.jpg",
    ],
    externalUrl: "https://tomuswear.company.site/products/african-black",
    rating: 5.0,
    reviewCount: 124,
    description:
      "African Brown NeoSuede. The embodiment of craft. Carefully designed to make you stand out. The first ever cork sole footwear with permanent bonding in Africa",
    colors: [],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "6",
    name: "African Black NeoSuede",
    price: "₵520.00",
    originalPrice: "₵620.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726263410/African-black-main_csa4xn.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726263410/African-black-main_csa4xn.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726263423/African-black-main1_vhjom8.jpg",
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726071159/half-birk-black_rbdxbk.jpg",
    ],
    externalUrl: "https://tomuswear.company.site/products/african-black",
    rating: 5.0,
    reviewCount: 124,
    description:
      "African Black NeoSuede. The embodiment of craft. Carefully designed to make you stand out. The first ever cork sole footwear with permanent bonding in Africa",
    colors: [],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "7",
    name: "Clogs Black Nubuck Suede",
    price: "₵350.00",
    originalPrice: "₵450.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726071153/half-birk-black-main_yr5x3w.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726071153/half-birk-black-main_yr5x3w.jpg",
      // "https://res.cloudinary.com/dki2r1gnf/image/upload/v1727021770/Half-birk-army_ho2d2n.jpg",
    ],
    externalUrl:
      "https://tomuswear.company.site/products/clogs-black-nubuck-suede",
    rating: 4.9,
    reviewCount: 89,
    description:
      "Comfortable and stylish clogs in black nubuck suede. Perfect for everyday wear with a modern design that complements any outfit.",
    colors: [
      {
        name: "Black Nubuck Suede",
        value: "#000000",
        images: [
          "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726071153/half-birk-black-main_yr5x3w.jpg",
        ],
      },
      // {
      //   name: "Army",
      //   value: "#4B5320",
      //   images: [
      //     "https://res.cloudinary.com/dki2r1gnf/image/upload/v1727021770/Half-birk-army_ho2d2n.jpg",
      //   ],
      // },
    ],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 8,
  },
  {
    id: "8",
    name: "Nsaa Black",
    price: "₵250.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726568378/sf7eqmuj9uspigykb8fd_Square_category_avqtge_1_1_oltw20.webp",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726568378/sf7eqmuj9uspigykb8fd_Square_category_avqtge_1_1_oltw20.webp",
    ],
    externalUrl: "https://tomuswear.company.site/products/nsaa",
    rating: 4.8,
    reviewCount: 67,
    description:
      "Classic Nsaa design in black. A timeless piece that offers both style and comfort for everyday wear.",
    colors: [
      {
        name: "Black",
        value: "#000000",
        images: [
          "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726568378/sf7eqmuj9uspigykb8fd_Square_category_avqtge_1_1_oltw20.webp",
        ],
      },
    ],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 12,
  },
  {
    id: "9",
    name: "Clogs Army Nubuck Suede",
    price: "₵320.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1727021770/Half-birk-army_ho2d2n.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1727021770/Half-birk-army_ho2d2n.jpg",
    ],
    externalUrl: "https://tomuswear.company.site/products/clogs-army",
    rating: 4.7,
    reviewCount: 45,
    description:
      "Army green clogs Nubuck Suede  with a rugged yet stylish appearance. Perfect for outdoor activities and casual wear.",
    colors: [
      {
        name: "Army Nubuck Suede",
        value: "#4B5320",
        images: [
          "https://res.cloudinary.com/dki2r1gnf/image/upload/v1727021770/Half-birk-army_ho2d2n.jpg",
        ],
      },
    ],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 6,
  },
  {
    id: "10",
    name: "Stik Army",
    price: "₵270.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726071115/Stick_rtdihf.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726071115/Stick_rtdihf.jpg",
    ],
    externalUrl: "https://tomuswear.company.site/products/stik",
    rating: 4.6,
    reviewCount: 34,
    description:
      "Army green Stik Nubuck Suede shoes with a unique design. Lightweight and comfortable for all-day wear.",
    colors: [
      {
        name: "Army Nubuck Suede",
        value: "#4B5320",
        images: [
          "https://res.cloudinary.com/dki2r1gnf/image/upload/v1726071115/Stick_rtdihf.jpg",
        ],
      },
    ],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 10,
  },
  {
    id: "11",
    name: "Two Buckle Black Leather",
    price: "₵250.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1754447629/photo_2025-08-06_02-33-24_txlibx.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1754447629/photo_2025-08-06_02-33-24_txlibx.jpg",
    ],
    externalUrl: "https://tomuswear.company.site/products/two-buckle",
    rating: 4.5,
    reviewCount: 28,
    description:
      "Classic two buckle design in black. A versatile shoe that can be dressed up or down for any occasion.",
    colors: [
      {
        name: "Black Leather",
        value: "#000000",
        images: [
          "https://res.cloudinary.com/dki2r1gnf/image/upload/v1754447629/photo_2025-08-06_02-33-24_txlibx.jpg",
        ],
      },
    ],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 7,
  },
  {
    id: "12",
    name: "Tonto Black Leather",
    price: "₵240.00",
    image:
      "https://d2j6dbq0eux0bg.cloudfront.net/images/66306271/4077203565.webp",
    images: [
      "https://d2j6dbq0eux0bg.cloudfront.net/images/66306271/4077203565.webp",
    ],
    externalUrl: "https://tomuswear.company.site/products/tonto-black",
    rating: 4.4,
    reviewCount: 19,
    description:
      "Tonto is made with a clean and pure Black leather suitable for holiday outfits and office comfort. It comes with a rubber neck and a solid Black foundation.",
    colors: [
      {
        name: "Black Leather",
        value: "#000000",
        images: [
          "https://d2j6dbq0eux0bg.cloudfront.net/images/66306271/4077203565.webp",
          "https://d2j6dbq0eux0bg.cloudfront.net/images/66306271/4507811258.webp",
        ],
      },
    ],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 9,
  },
  {
    id: "13",
    name: "Clogs Brown Nubuck Suede",
    price: "₵320.00",
    image:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1754448731/photo_2025-08-06_02-51-52_dn3sxf.jpg",
    images: [
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1754448731/photo_2025-08-06_02-51-52_dn3sxf.jpg",
    ],
    externalUrl:
      "https://tomuswear.company.site/products/clogs-brown-nubuck-suede",
    rating: 4.8,
    reviewCount: 56,
    description:
      "Warm brown clogs in nubuck suede. Classic design with premium materials for lasting comfort and style.",
    colors: [
      {
        name: "Brown Nubuck Suede",
        value: "#8B4513",
        images: [
          "https://res.cloudinary.com/dki2r1gnf/image/upload/v1754448731/photo_2025-08-06_02-51-52_dn3sxf.jpg",
        ],
      },
    ],
    sizes: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
    ],
    inStock: true,
    stockCount: 11,
  },
];
