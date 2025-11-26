const isEmail = require('../../validators/email/email');

test('safeString: undefined and null are treated as empty and return false', () => {
  expect(isEmail(undefined)).toBe(false);
  expect(isEmail(null)).toBe(false);
});

test('empty string is invalid', () => {
  expect(isEmail('')).toBe(false);
  expect(isEmail('   ')).toBe(false);
});

test('long total length > 254 is rejected', () => {
  // build an email with length 255
  const local = 'a'.repeat(64);
  const restLen = 255 - (local.length + 1); // minus '@'
  const domainBody = 'b'.repeat(restLen - 4); // leave room for ".com"
  const email = `${local}@${domainBody}.com`;
  expect(email.length).toBeGreaterThan(254);
  expect(isEmail(email)).toBe(false);
});

test('valid maximum allowed total length (<=254) is accepted', () => {
  const local = 'a'.repeat(64);
  // make domain such that total is exactly 254 or less while keeping labels <= 63
  const l1 = 'b'.repeat(63);
  const l2 = 'c'.repeat(63);
  const l3 = 'd'.repeat(58); // adjusted so total <= 254
  const domain = `${l1}.${l2}.${l3}.co`;
  const email = `${local}@${domain}`;
  expect(email.length).toBeLessThanOrEqual(254);
  expect(isEmail(email)).toBe(true);
});

test('missing @ or multiple @ signs are invalid', () => {
  expect(isEmail('plainaddress')).toBe(false);
  expect(isEmail('a@b@c.com')).toBe(false);
  expect(isEmail('@domain.com')).toBe(false);
});

test('local part length boundaries', () => {
  const okLocal = 'x'.repeat(64) + '@a.co';
  expect(isEmail(okLocal)).toBe(true);

  const tooLongLocal = 'x'.repeat(65) + '@a.co';
  expect(isEmail(tooLongLocal)).toBe(false);
});

test('local cannot start or end with dot or have consecutive dots', () => {
  expect(isEmail('.start@domain.com')).toBe(false);
  expect(isEmail('end.@domain.com')).toBe(false);
  expect(isEmail('a..b@domain.com')).toBe(false);
});

test('local containing whitespace is invalid', () => {
  expect(isEmail('ab c@domain.com')).toBe(false);
  expect(isEmail('a\tb@domain.com')).toBe(false);
});

test('domain length boundaries and dot presence', () => {
  // domain with no dot
  expect(isEmail('u@domain')).toBe(false);

  // domain that starts or ends with dot
  expect(isEmail('u@.domain.com')).toBe(false);
  expect(isEmail('u@domain.com.')).toBe(false);

  // domain total length exceeding validator limit
  const longDomain = 'a'.repeat(254);
  expect(isEmail(`u@${longDomain}`)).toBe(false);
});

test('TLD length rules (TLD must be >= 2)', () => {
  expect(isEmail('user@domain.c')).toBe(false);
  expect(isEmail('user@domain.co')).toBe(true);
});

test('label length 63 accepted, 64 rejected', () => {
  const label63 = 'a'.repeat(63);
  const email63 = `u@${label63}.com`;
  expect(isEmail(email63)).toBe(true);

  const label64 = 'a'.repeat(64);
  const email64 = `u@${label64}.com`;
  expect(isEmail(email64)).toBe(false);
});

test('label cannot start or end with hyphen', () => {
  expect(isEmail('u@-label.com')).toBe(false);
  expect(isEmail('u@label-.com')).toBe(false);
  expect(isEmail('u@la-bel.com')).toBe(true);
});

test('label whitespace invalid and illegal characters invalid', () => {
  expect(isEmail('u@la bel.com')).toBe(false);
  expect(isEmail('u@label!.com')).toBe(false);
});

test('punycode labels (xn--) accepted and case-insensitivity works for domain', () => {
  expect(isEmail('user@xn--example.com')).toBe(true);
  // uppercase domain labels should be allowed
  expect(isEmail('user@EXAMPLE.COM')).toBe(true);
});

test('labels that match allowed regex (alphanum and hyphen) pass, others fail', () => {
  expect(isEmail('u@123-45.com')).toBe(true);
  expect(isEmail('u@name_with_underscore.com')).toBe(false);
});

test('edge-case: numeric-only label allowed', () => {
  expect(isEmail('u@12345.com')).toBe(true);
});

test('a few negative cases that reveal flipped boolean/return mutations', () => {
  // leading/trailing whitespace trimmed and still accepted when valid
  expect(isEmail('  alice@example.com  ')).toBe(true);
  // weird but invalid characters in local part
  expect(isEmail('al!ce@example.com')).toBe(true); // local part allows many characters by our validator — keep this to detect unexpected flipping
  // a definitely invalid overall structure
  expect(isEmail('not@valid@twoats')).toBe(false);
});

test('verify domain includes dot check (should be invalid if missing)', () => {
  expect(isEmail('user@localhost')).toBe(false);
});

