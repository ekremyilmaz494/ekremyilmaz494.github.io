// -*- coding: utf-8 -*-
/** KAP — yükseltilmiş yüzey. Kart yalnız gerçekten katman gerektiğinde kullanılır;
 *  aksi hâlde bölümler kenarlık ya da boşlukla ayrılır. */
import { cn } from "@/lib/cn";

const YUZEY = {
  koyu: "bg-yesil-orta text-krem shadow-kart",
  krem: "bg-krem text-murekkep shadow-krem",
  "krem-koyu": "bg-krem-koyu text-murekkep shadow-krem",
  cizgi: "border border-current/15",
} as const;

export default function Kap({
  yuzey = "koyu", children, sinif, as: Etiket = "div",
}: {
  yuzey?: keyof typeof YUZEY;
  children: React.ReactNode;
  sinif?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Etiket className={cn("rounded-kart", YUZEY[yuzey], sinif)}>{children}</Etiket>
  );
}
