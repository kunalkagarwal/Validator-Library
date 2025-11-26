const coordinates = require('../../validators/coordinates/coordinates');

describe('Coordinates validator (lat,lon)', () => {
  test('valid comma-separated decimals', () => {
    expect(coordinates('12.9716,77.5946')).toBe(true);
    expect(coordinates('-12.9716, -77.5946')).toBe(true);
  });

  test('valid whitespace-separated decimals', () => {
    expect(coordinates('12.9716 77.5946')).toBe(true);
    expect(coordinates('  -0.0000\t180.0000 ')).toBe(true);
  });

  test('valid integer coordinates and edge values', () => {
    expect(coordinates('90,180')).toBe(true);
    expect(coordinates('-90 -180')).toBe(true);
    expect(coordinates([90, 180])).toBe(true);
    expect(coordinates([-90, '-180'])).toBe(true);
  });

  test('invalid: out-of-range values', () => {
    expect(coordinates('91,0')).toBe(false);
    expect(coordinates('0,181')).toBe(false);
    expect(coordinates('-90.0001,0')).toBe(false);
    expect(coordinates('0,-180.0001')).toBe(false);
    expect(coordinates([100, 0])).toBe(false);
    expect(coordinates([0, -200])).toBe(false);
  });

  test('invalid formatting and parts', () => {
    expect(coordinates('')).toBe(false);
    expect(coordinates('12.34')).toBe(false);           // only one number
    expect(coordinates('12.34,56.78,90')).toBe(false);  // too many parts
    expect(coordinates('12.34;56.78')).toBe(false);     // wrong separator
    expect(coordinates('lat,lon')).toBe(false);         // non-numeric
  });

  test('array inputs valid/invalid', () => {
    expect(coordinates([12.34, 56.78])).toBe(true);
    expect(coordinates(['12.34','56.78'])).toBe(true);
    expect(coordinates(['12.34'])).toBe(false);       // missing part
    expect(coordinates([12.34, 'x'])).toBe(false);    // invalid number
    expect(coordinates([{},{ }])).toBe(false);
  });

  test('reject non-string non-array types', () => {
    expect(coordinates(null)).toBe(false);
    expect(coordinates(undefined)).toBe(false);
    expect(coordinates(12345)).toBe(false);
    expect(coordinates({ lat: 12.34, lon: 56.78 })).toBe(false);
  });
});
