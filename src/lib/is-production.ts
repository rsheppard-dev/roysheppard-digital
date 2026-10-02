/**
 * True only for the live production deployment. Resolved from build-time env
 * (not the request Host header) so pages can stay statically rendered.
 * Railway sets RAILWAY_ENVIRONMENT_NAME, Vercel sets VERCEL_ENV; anywhere else
 * falls back to NODE_ENV.
 */
export const isProduction: boolean = process.env.RAILWAY_ENVIRONMENT_NAME
  ? process.env.RAILWAY_ENVIRONMENT_NAME === "production"
  : process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
