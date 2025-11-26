const creditCard = require('../../validators/creditcard/creditcard');

describe('Credit Card validator', () => {
  test('valid Visa cards (16-digit)', () => {
    expect(creditCard('4111111111111111')).toBe(true);
    expect(creditCard('4012888888881881')).toBe(true);
  });

  test('valid MasterCard and Discover', () => {
    expect(creditCard('5555555555554444')).toBe(true); // MasterCard test number
    expect(creditCard('6011111111111117')).toBe(true); // Discover test number
  });

  test('valid American Express (15-digit)', () => {
    expect(creditCard('378282246310005')).toBe(true);
  });

  test('valid with spaces and dashes', () => {
    expect(creditCard('4111 1111 1111 1111')).toBe(true);
    expect(creditCard('4111-1111-1111-1111')).toBe(true);
  });

  test('invalid numbers (wrong checksum)', () => {
    expect(creditCard('4111111111111112')).toBe(false); // one-digit changed
    expect(creditCard('5555555555554445')).toBe(false);
  });

  test('invalid input types and characters', () => {
    expect(creditCard(null)).toBe(false);
    expect(creditCard(undefined)).toBe(false);
    expect(creditCard(4111111111111111)).toBe(false); // number type -> false (enforce string)
    expect(creditCard('abcd-efgh-ijkl-mnop')).toBe(false);
  });

  test('invalid due to length (too short / too long)', () => {
    expect(creditCard('123456789012')).toBe(false); // 12 digits
    expect(creditCard('1'.repeat(20))).toBe(false);  // 20 digits
  });
});
