// -*- coding: utf-8 -*-
/** TELEFON BİÇİMİ — veri +90XXXXXXXXXX olarak saklanır, ekranda 0XXX XXX XX XX gösterilir. */
export const telHref = (e164: string) => `tel:${e164}`;

export function telGoster(e164: string) {
  const n = e164.replace(/\D/g, "").replace(/^90/, "");
  if (n.length !== 10) return e164;
  return `0${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6, 8)} ${n.slice(8)}`;
}

/** WhatsApp bağlantısı: wa.me sayı formatı ülke kodlu ve işaretsizdir. */
export const waLink = (e164: string, mesaj?: string) =>
  `https://wa.me/${e164.replace(/\D/g, "")}${mesaj ? `?text=${encodeURIComponent(mesaj)}` : ""}`;
