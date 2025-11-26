const hexColor = require('../../validators/hexcolor/hexcolor');

describe('Hex color validator', () => {
  test('valid 6-digit with # and lowercase', () => {
    expect(hexColor('#ffffff')).toBe(true);
    expect(hexColor('#000000')).toBe(true);
  });

  test('valid 6-digit uppercase and without #', () => {
    expect(hexColor('A1B2C3')).toBe(true);
    expect(hexColor('#ABCDEF')).toBe(true);
  });

  test('valid 3-digit shorthand', () => {
    expect(hexColor('#fff')).toBe(true);
    expect(hexColor('000')).toBe(true);
    expect(hexColor('F0A')).toBe(true);
  });

  test('trimmed input allowed', () => {
    expect(hexColor('  #abc123  ')).toBe(true);
  });

  test('reject non-string inputs', () => {
    expect(hexColor(null)).toBe(false);
    expect(hexColor(undefined)).toBe(false);
    expect(hexColor(123456)).toBe(false);
    expect(hexColor({})).toBe(false);
  });

  test('reject invalid lengths and characters', () => {
    expect(hexColor('#abcd')).toBe(false);      // 4 chars
    expect(hexColor('#ab')).toBe(false);        // 2 chars
    expect(hexColor('#abcdex')).toBe(false);    // invalid char 'x' (if beyond hex)
    expect(hexColor('#12g')).toBe(false);       // 'g' invalid
    expect(hexColor('12345')).toBe(false);      // 5 chars
  });

  test('edgecases: leading/trailing characters not allowed', () => {
    expect(hexColor('##fff')).toBe(false);
    expect(hexColor('#fff#')).toBe(false);
    expect(hexColor(' #fff ')).toBe(true); // trimmed OK
    expect(hexColor('0xFFFFFF')).toBe(false); // 0x prefix not accepted
  });
});
