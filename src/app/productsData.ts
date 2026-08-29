export interface ColorVariant {
  name: string;
  hex: string;
  cardImages?: string[];
  images: string[];
}

export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  descriptionKey?: string;
  cardImages?: string[];
  colors: ColorVariant[];
}

// 3 pieces set (assets in public/products/3 pieces)
const threePiecesCard = [
  "/products/3 pieces/home page cards/1-01.webp",
  "/products/3 pieces/home page cards/1-02.webp",
];

const threePiecesWhite = [
  "/products/3 pieces/white/1-01.webp",
  "/products/3 pieces/white/1-02.webp",
  "/products/3 pieces/white/1-03.webp",
  "/products/3 pieces/white/1-04.webp",
  "/products/3 pieces/white/1-05.webp",
  "/products/3 pieces/white/1-06.webp",
  "/products/3 pieces/white/1-07.webp",
];

const threePiecesBlack = [
  "/products/3 pieces/Black/1-01.webp",
  "/products/3 pieces/Black/1-03.webp",

  "/products/3 pieces/Black/1-05.webp",
  "/products/3 pieces/Black/1-06.webp",
  "/products/3 pieces/Black/1-07.webp",
];

// 2 pieces set (assets in public/products/2 pieces)
const twoPiecesCard = [
  "/products/2 pieces/home page cards/white webp-06.webp",
  "/products/2 pieces/home page cards/white webp-07.webp",
];

const twoPiecesWhite = [
  "/products/2 pieces/white/white webp-01.webp",
  "/products/2 pieces/white/white webp-02.webp",
  "/products/2 pieces/white/white webp-03.webp",
  "/products/2 pieces/white/white webp-04.webp",
  "/products/2 pieces/white/white webp-05.webp",
  "/products/2 pieces/white/white webp-06.webp",
  "/products/2 pieces/white/white webp-07.webp",
];

const twoPiecesBlack = [
  "/products/2 pieces/Black/black webp-01.webp",
  "/products/2 pieces/Black/black webp-02.webp",
  "/products/2 pieces/Black/black webp-03.webp",
  "/products/2 pieces/Black/black webp-04.webp",
  "/products/2 pieces/Black/black webp-05.webp",
  "/products/2 pieces/Black/black webp-06.webp",
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "عباية فلة ( 3 pieces )",
    price: "14,500 DA",
    originalPrice: "19,500 DA",
    rating: 5,
    reviews: 269,
    descriptionKey: "product.desc.threePieces",
    cardImages: threePiecesCard,
    colors: [
      { name: "White", hex: "#F5F5F0", images: threePiecesWhite },
      { name: "Black", hex: "#1A1A1A", images: threePiecesBlack },
    ],
  },
  {
    id: 2,
    name: "عباية فلة ( 2 pieces )",
    price: "5,900 DA",
    originalPrice: "8,500 DA",
    rating: 5,
    reviews: 145,
    descriptionKey: "product.desc.twoPieces",
    cardImages: twoPiecesCard,
    colors: [
      { name: "White", hex: "#F5F5F0", images: twoPiecesWhite },
      { name: "Black", hex: "#1A1A1A", images: twoPiecesBlack },
    ],
  },
];

export const getProduct = (id: number): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

// Arch clip path shared by the home product cards (kept for backwards compatibility)
export const ARCH_CLIP_PATH =
  "M636.67 33.64L677.79 76.62L678.92 77.79C726.87 127.10 791.40 143.28 872.44 163.09L872.45 163.09C921.88 175.20 973.71 187.87 1030.80 209.76C1149.86 255.40 1227.31 340.47 1233.91 438.84L1234.02 440.62C1238.15 511.54 1204.72 577.63 1142.17 628.04L1212.58 704.47L1212.59 704.48C1226.60 719.71 1234.36 737.83 1234.36 756.87V1394.13C1234.36 1447.89 1175.19 1486.65 1109.97 1486.65L1094.48 1486.66V1486.65H139.89C74.67 1486.65 15.49 1447.89 15.49 1394.12V756.86C15.49 737.80 23.26 719.67 37.27 704.46V704.46L107.68 628.03C44.62 577.20 11.15 510.42 15.95 438.83V438.83C22.55 340.46 99.98 255.39 219.05 209.75C276.16 187.86 328.01 175.18 377.17 163.15L377.18 163.15L377.21 163.14L377.22 163.14L377.23 163.14C459.09 143.11 524.00 126.83 572.06 76.61L572.06 76.61L613.20 33.63L624.93 21.37L636.67 33.64Z";
