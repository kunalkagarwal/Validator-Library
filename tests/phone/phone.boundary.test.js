const { validatePhone: v } = require('../../validators/phone/phone');

describe('Phone validator - boundary cases', () => {
test('Empty string', () => expect(v('')).toBe(false));
test('Null', () => expect(v(null)).toBe(false));
test('Short number', () => expect(v('12345')).toBe(false));
test('All zeros 10-digit', () => expect(v('0000000000')).toBe(false));

// Max E.164 length is 15 digits (without +). 15-digit should pass when valid.
test('Max E.164 length (15 digits)', () => expect(v('+123456789012345')).toBe(true));
test('Too long (16 digits) fails', () => expect(v('+1234567890123456')).toBe(false));
});
