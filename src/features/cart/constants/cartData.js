import img1 from "@/assets/img1.jpg";
import img2 from "@/assets/img2.jpg";

export const INITIAL_CART_ITEMS = [
  {
    id: 1,
    title: "The Ashford",
    description:
      "Phase 1 Blueprint & Engineering Package. Includes complete structural drafts, MEP specifications, and initial site adaptation parameters.",
    price: 1200000,
    qty: 1,
    image: img1,
  },
  {
    id: 2,
    title: "The Wellington",
    description:
      "Core Architectural Concept. Includes schematic design, spatial layouts, and preliminary material palettes.",
    price: 850000,
    qty: 1,
    image: img2,
  },
];

export const SITE_ADAPTATION_FEE = 45000;