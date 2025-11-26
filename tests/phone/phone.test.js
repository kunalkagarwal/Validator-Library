const { validatePhone } = require('../../validators/phone/phone');

describe('Phone validator - valid numbers', () => {
test('Plain 10-digit Indian number', () => {
expect(validatePhone('9876543210')).toBe(true);
});

test('Indian with +91 and separators', () => {
expect(validatePhone('+91 98765-43210')).toBe(true);
});

test('Indian with leading 0', () => {
expect(validatePhone('09876543210')).toBe(true);
});

test('E.164 UK number', () => {
expect(validatePhone('+447911123456')).toBe(true);
});

test('E.164 US number with separators', () => {
expect(validatePhone('+1-202-555-0143')).toBe(true);
});
});
