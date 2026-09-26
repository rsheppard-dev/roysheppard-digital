/**
 * True only for the live production deployment. Resolved from build-time env
 * (not the request Host header) so pages can stay statically rendered.
 * Netlify sets CONTEXT ("production" | "deploy-preview" | "branch-deploy"),
 * Vercel sets VERCEL_ENV; anywhere else falls back to NODE_ENV.
 */
export const isProduction: boolean = process.env.CONTEXT
  ? process.env.CONTEXT === "production"
  : process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
