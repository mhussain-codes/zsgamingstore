declare module "next/server.js" {
  export * from "next/dist/server/web/exports/index";
}

declare module "next/server" {
  export * from "next/dist/server/web/exports/index";
}

declare module "next" {
  export * from "next/types/index";
  export type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
  export namespace MetadataRoute {
    export type Sitemap = Array<{
      url: string;
      lastModified?: string | Date;
      changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
      priority?: number;
    }>;
  }
}
