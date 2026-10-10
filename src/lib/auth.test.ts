import { authErrorKey, isValidEmail } from './auth';

describe('isValidEmail', () => {
  it('accepts normal emails, ignoring spaces around', () => {
    expect(isValidEmail('joe@groo.app')).toBe(true);
    expect(isValidEmail('  joe@gmail.com ')).toBe(true);
  });

  it('rejects incomplete emails', () => {
    for (const bad of ['', 'joe', 'joe@', 'joe@gmail', 'joe@gmail.c', 'jo e@gmail.com']) {
      expect(isValidEmail(bad)).toBe(false);
    }
  });
});

describe('authErrorKey', () => {
  it('maps rate limits to "too many tries"', () => {
    expect(authErrorKey({ status: 429 })).toBe('signIn.errors.tooMany');
    expect(authErrorKey({ status: 400, code: 'over_email_send_rate_limit' })).toBe('signIn.errors.tooMany');
  });

  it('maps network failures to "offline"', () => {
    expect(authErrorKey({ name: 'AuthRetryableFetchError', status: 0 })).toBe('signIn.errors.offline');
  });

  it('falls back to a generic friendly message', () => {
    expect(authErrorKey({ status: 500 })).toBe('signIn.errors.generic');
    expect(authErrorKey(null)).toBe('signIn.errors.generic');
  });
});
