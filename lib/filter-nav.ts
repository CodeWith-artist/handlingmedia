export function filterNavByRole(items: any[], role: string): any[] {
  return items
    .filter((item) => {
      // If no role restriction
      if (!item.role) return true;

      // Check access
      return item.role.includes(role);
    })
    .map((item) => ({
      ...item,

      // IMPORTANT:
      // recursively filter children
      children: item.children
        ? filterNavByRole(item.children, role)
        : undefined,
    }))
    .filter((item) => {
      // Remove empty parents
      if (item.children && item.children.length === 0) {
        return false;
      }

      return true;
    });
}