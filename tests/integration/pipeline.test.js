const validators = require('../../index');

function runPipeline(payload, sequence) {
  for (const field of sequence) {
    const fn = validators[field];
    try {
      const res = fn(payload[field]);
      if (typeof res === 'boolean' && !res) {
        return { ok: false, failedAt: field, raw: res };
      }
      if (res && typeof res === 'object' && res.valid === false) {
        return { ok: false, failedAt: field, raw: res };
      }
    } catch (err) {
      return { ok: false, failedAt: field, raw: err.message || String(err) };
    }
  }
  return { ok: true };
}

describe('INTEGRATION: Sequential pipeline validation (diagnostic)', () => {
  test('fails on the first invalid field (unchanged)', () => {
    const payload = {
      email: 'invalid-email-format',
      phone: '9876543210',
      username: 'kunal'
    };

    const sequence = ['email', 'phone', 'username'];
    const out = runPipeline(payload, sequence);

    expect(out.ok).toBe(false);
    expect(out.failedAt).toBe('email');
  });

  test('succeeds when everything is valid (diagnostic)', () => {
    const payload = {
      email: 'valid@example.com',
      phone: '+919876543210',
      username: 'kunal_123'
    };

    const sequence = ['email', 'phone', 'username'];
    const out = runPipeline(payload, sequence);

    if (!out.ok) {
      // helpful console output for failing field
      console.error('\nPipeline failure at:', out.failedAt, 'raw:', out.raw);
      throw new Error(`Pipeline expected success but failed at ${out.failedAt}`);
    }

    expect(out.ok).toBe(true);
  });
});
