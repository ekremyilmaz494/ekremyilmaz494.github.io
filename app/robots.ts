import type { MetadataRoute } from "next";
import { MARKA } from "@/data/franchise";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${MARKA.web}/sitemap.xml`,
    host: `https://${MARKA.web}`,
  };
}
