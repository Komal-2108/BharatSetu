export function getWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("bharatsetu_wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function toggleWishlist(serviceId: string): string[] {
  const current = getWishlist();
  const exists = current.includes(serviceId);
  let updated: string[];
  if (exists) {
    updated = current.filter((id) => id !== serviceId);
  } else {
    updated = [...current, serviceId];
  }
  localStorage.setItem("bharatsetu_wishlist", JSON.stringify(updated));
  return updated;
}

export function isWishlisted(serviceId: string): boolean {
  const current = getWishlist();
  return current.includes(serviceId);
}
