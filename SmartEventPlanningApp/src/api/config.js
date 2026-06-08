// API taban adresi: boş bırakılırsa aynı origin üzerinden (Vite/nginx proxy) çalışır.
// Ayrı bir API domain'i için build sırasında VITE_API_BASE verin (örn. https://api.domain.com).
export const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export const profileImageUrl = (id) => `${API_BASE}/api/Users/ProfileImage/${id}`;

export const CHAT_HUB_URL = `${API_BASE}/chat`;
