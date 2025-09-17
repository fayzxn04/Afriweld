export const companyColor = "#117774";
export const ITEMS_PER_PAGE = 10;

export const adminRole = [
  { value: "superadmin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
  { value: "staff", label: "Staff" },
];

export const nonAdminRole = adminRole.filter(
  (role) =>
    role.value === "moderator" ||
    role.value === "staff" ||
    role.value === "admin"
);
