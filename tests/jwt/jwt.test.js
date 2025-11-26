const jwt = require('../../validators/jwt/jwt');

describe('JWT format validator', () => {
  test('valid JWT formats', () => {
    expect(jwt('aaa.bbb.ccc')).toBe(true);
    expect(jwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIn0.sig')).toBe(true);
  });

  test('trim allowed', () => {
    expect(jwt('  aaa.bbb.ccc  ')).toBe(true);
  });

  test('invalid formats', () => {
    expect(jwt('aaa.bbb')).toBe(false);
    expect(jwt('.bbb.ccc')).toBe(false);
    expect(jwt('aaa..ccc')).toBe(false);
    expect(jwt('aaa.bbb.ccc.ddd')).toBe(false);
    expect(jwt('aa$%.bbb.ccc')).toBe(false);
  });

  test('non-string', () => {
    expect(jwt(null)).toBe(false);
    expect(jwt({})).toBe(false);
    expect(jwt(123)).toBe(false);
  });
});
