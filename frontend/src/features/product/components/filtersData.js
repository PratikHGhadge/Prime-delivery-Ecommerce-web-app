export const filters = [
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

export const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false, value: "sortByRatings" },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false, value: "lowToHigh" },
  { name: "Price: High to Low", href: "#", current: false, value: "highToLow" },
];
