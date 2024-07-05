export const GetRoleInArabic = (role) => {
  if (role === "Editor") {
    return "محرر";
  } else if (role === "Admin") {
    return "مشرف";
  } else if (role === "Accountant") {
    return "محاسب";
  } else if (role === "Delivery") {
    return "عامل توصيل";
  }
};
