export const TranslateSize = ({ title }) => {
  switch (title) {
    case "2xl":
      return "عائلي";
    case "xl":
      return "فردين";
    case "lg":
      return "كبير";
    case "md":
      return "وسط";
    case "sm":
      return "صغير";
  }
};
