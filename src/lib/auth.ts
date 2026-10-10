// Pure auth helpers (no network), easy to test.

/** Light check before we call the server. The server does the real validation. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export type AuthErrorKey = 'signIn.errors.tooMany' | 'signIn.errors.offline' | 'signIn.errors.generic';

/** Map a Supabase auth error to a friendly i18n key. Never shows raw server text. */
export function authErrorKey(error: { status?: number; code?: string; name?: string } | null | undefined): AuthErrorKey {
  if (!error) return 'signIn.errors.generic';
  if (error.status === 429 || error.code === 'over_email_send_rate_limit' || error.code === 'over_request_rate_limit') {
    return 'signIn.errors.tooMany';
  }
  if (error.name === 'AuthRetryableFetchError' || error.status === 0) return 'signIn.errors.offline';
  return 'signIn.errors.generic';
}
