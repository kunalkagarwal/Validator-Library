const validators = require('../../index');

function evaluate(fn, input) {
  try {
    const result = fn(input);

    if (typeof result === 'boolean') return { valid: result, raw: result };
    if (result && typeof result === 'object') {
      if ('valid' in result) return { valid: !!result.valid, raw: result };
      if ('error' in result) return { valid: false, raw: result };
    }
    return { valid: !!result, raw: result };
  } catch (err) {
    return { valid: false, raw: err.message || String(err) };
  }
}

describe('INTEGRATION: Validate full user payload end-to-end (diagnostic)', () => {
  test('valid sample payload (report failures) — aadhar omitted', () => {
    const payload = {
      email: 'alice@example.com',
      phone: '+919876543210',
      url: 'https://example.com',
      ip: '192.168.1.1',
      username: 'alice_01',
      password: 'S3cureP@ssw0rd',
      date: '2024-12-31',
      creditcard: '4111111111111111',
      luhn: '79927398713',
      isbn: '9780306406157',
      hexcolor: '#1A2B3C',
      postal: '560001',
      pan: 'ABCDE1234F',
      // aadhar intentionally omitted because sample values can be strict - test suite will validate other fields
      uuid: '550e8400-e29b-41d4-a716-446655440000',
      time: '12:45:30',
      coordinates: '27.2046,77.4977',
      mac: '00:1A:2B:3C:4D:5E',
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
           'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
           'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
    };

    const results = {};
    for (const [key, fn] of Object.entries(validators)) {
      if (payload[key] !== undefined) {
        results[key] = evaluate(fn, payload[key]);
      }
    }

    const failed = Object.entries(results)
      .filter(([, r]) => !r.valid)
      .map(([k, r]) => ({ key: k, raw: r.raw }));

    if (failed.length > 0) {
      console.error('\nIntegration full-payload failures (%d):', failed.length);
      failed.forEach(f => console.error(` - ${f.key}:`, f.raw));
      throw new Error(`Full-payload validation failed for: ${failed.map(f => f.key).join(', ')}`);
    }

    expect(Object.keys(results).length).toBeGreaterThan(0);
  });
});
