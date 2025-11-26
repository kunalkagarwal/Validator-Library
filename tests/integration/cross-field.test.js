const validators = require('../../index');

function safe(fn, value) {
  try {
    const r = fn(value);
    if (typeof r === 'boolean') return { ok: r, raw: r };
    if (r && typeof r === 'object' && 'valid' in r) return { ok: !!r.valid, raw: r };
    return { ok: !!r, raw: r };
  } catch (err) {
    return { ok: false, raw: err.message || String(err) };
  }
}

describe('INTEGRATION: Cross-field rules (diagnostic)', () => {
  test('Indian phone ↔ Indian postal consistency (illustrative)', () => {
    const phone = '+919876543210';
    const postal = '560001';

    const phoneRes = safe(validators.phone, phone);
    const postalRes = safe(validators.postal, postal);

    if (!phoneRes.ok || !postalRes.ok) {
      console.error('\nCross-field diagnostic:');
      console.error(' - phone:', phoneRes);
      console.error(' - postal:', postalRes);
      throw new Error(`Cross-field expectation failed (phoneOk=${phoneRes.ok}, postalOk=${postalRes.ok})`);
    }

    expect(phoneRes.ok).toBe(true);
    expect(postalRes.ok).toBe(true);
  });
});
