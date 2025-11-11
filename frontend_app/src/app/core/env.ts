 /**
  * Environment variable accessors for API endpoints.
  * Values can be provided via build-time define or as global variables at runtime.
  * Do not hardcode URLs. Respect container env:
  * - NG_APP_API_BASE
  * - NG_APP_BACKEND_URL
  */

declare const NG_APP_API_BASE: string | undefined;
declare const NG_APP_BACKEND_URL: string | undefined;

// PUBLIC_INTERFACE
export function getApiBase(): string | undefined {
  /** Resolve API base URL from environment. Order: NG_APP_API_BASE, NG_APP_BACKEND_URL. */
  const fromWindow = (globalThis as any)?.NG_APP_API_BASE || (globalThis as any)?.NG_APP_BACKEND_URL;
  const fromDefines = typeof NG_APP_API_BASE !== 'undefined' ? NG_APP_API_BASE :
                      (typeof NG_APP_BACKEND_URL !== 'undefined' ? NG_APP_BACKEND_URL : undefined);
  const value = fromWindow || fromDefines;
  return typeof value === 'string' && value.trim().length ? value.trim() : undefined;
}
