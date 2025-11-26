const luhn = require('../../validators/luhn/luhn');

/**
 * Helper to compute the Luhn check digit for a base numeric string (without check digit).
 * Returns the single digit (0-9) that makes the whole string Luhn-valid.
 */
function computeLuhnCheckDigit(base) {
  for (let d = 0; d <= 9; d++) {
    if (luhn(base + String(d))) return d;
  }
  return -1;
}

describe('Luhn validator', () => {
  test('classic Luhn examples', () => {
    expect(luhn('79927398713')).toBe(true); // classic valid example
    expect(luhn('79927398710')).toBe(false); // invalid checksum
  });

  test('valid card-like numbers', () => {
    expect(luhn('4111111111111111')).toBe(true);
    expect(luhn('378282246310005')).toBe(true); // Amex (15-digit)
    expect(luhn('6011111111111117')).toBe(true); // Discover
  });

  test('accepts spaces and dashes', () => {
    expect(luhn('4111 1111 1111 1111')).toBe(true);
    expect(luhn('4111-1111-1111-1111')).toBe(true);
  });

  test('reject non-digit after normalization', () => {
    expect(luhn('4111-1111-1111-1a11')).toBe(false);
    expect(luhn('4111 1111 1111 \u200B1111')).toBe(false); // zero-width space
  });

  test('reject non-string types', () => {
    expect(luhn(4111111111111111)).toBe(false);
    expect(luhn(null)).toBe(false);
    expect(luhn(undefined)).toBe(false);
    expect(luhn({})).toBe(false);
  });

  test('programmatically generated valid numbers of different lengths', () => {
    const base12 = '123456789012'; // 12-digit base => 13-digit candidate
    const check13 = computeLuhnCheckDigit(base12);
    expect(check13).toBeGreaterThanOrEqual(0);
    const full13 = base12 + String(check13);
    expect(full13.length).toBe(13);
    expect(luhn(full13)).toBe(true);

    const base18 = '987654321098765432'; // 18-digit base => 19-digit candidate
    const check19 = computeLuhnCheckDigit(base18);
    expect(check19).toBeGreaterThanOrEqual(0);
    const full19 = base18 + String(check19);
    expect(full19.length).toBe(19);
    expect(luhn(full19)).toBe(true);
  });

  test('ensures doubling > 9 branch executed', () => {
    // Use the classic prefix that triggers large doubles
    const base = '7992739871'; // partial classic example
    const check = computeLuhnCheckDigit(base);
    expect(check).toBeGreaterThanOrEqual(0);
    const num = base + String(check);
    expect(luhn(num)).toBe(true);
  });
});
