/** Koşullu sınıf birleştirici. Küçük olduğu için bağımlılık eklenmedi. */
export const cn = (...parcalar: Array<string | false | null | undefined>) =>
  parcalar.filter(Boolean).join(" ");
