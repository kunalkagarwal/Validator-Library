const { validatePhone } = require('../../validators/phone/phone');

// These cases are chosen to kill likely mutants (off-by-one, trimming, loose regex)
describe('Phone validator - mutant killer cases', () => {
test('Reject alphabetic strings', () => {
expect(validatePhone('phone-number')).toBe(false);
});

test('Reject numbers with internal letters', () => {
expect(validatePhone('98765a3210')).toBe(false);
});

test('Reject leading plus with zero country code', () => {
// Mutants that drop the "first-digit can't be 0" check should return false here
expect(validatePhone('+0123456789')).toBe(false);
});

test('Reject too-short after removing non-digits', () => {
expect(validatePhone('+1 (202) 55-501')).toBe(false);
});

test('Reject number with correct length but invalid start (Indian rule)', () => {
// e.g., starts with 5 - invalid per Indian mobile numbering assumptions
expect(validatePhone('5876543210')).toBe(false);
});
});