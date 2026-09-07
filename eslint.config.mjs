import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react, React sürümünü ararken ESLint 10'un yeni context API'siyle çakışıyor
  // (getFilename artık kuralda değil). Sürümü elle vermek o aramayı hiç çalıştırmıyor.
  { settings: { react: { version: "19.2" } } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Satıcı dosyaları: draco çözücüsü three paketinden olduğu gibi kopyalanır, düzenlenmez.
    "public/**",
    ".qa/**",
  ]),
]);

export default eslintConfig;
