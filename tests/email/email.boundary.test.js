const isEmail = require('../../validators/email/email');

test('local length 64 is accepted', () => {
  const local = 'a'.repeat(64);
  const email = local + '@b.co';
  expect(isEmail(email)).toBe(true);
});

test('large but valid email with labels <= 63 is accepted', () => {
  const local = 'a'.repeat(64);
  const label1 = 'b'.repeat(63);
  const label2 = 'c'.repeat(63);
  const label3 = 'd'.repeat(58); // adjusted so total length <= 254
  const domain = `${label1}.${label2}.${label3}.co`;
  const email = `${local}@${domain}`;
  expect(email.length).toBeLessThanOrEqual(254);
  expect(isEmail(email)).toBe(true);
});

test('large but valid domain with labels <= 63 is accepted', () => {
  const label1 = 'x'.repeat(63);
  const label2 = 'y'.repeat(63);
  const label3 = 'z'.repeat(62);
  const domain = `${label1}.${label2}.${label3}.co`;
  const email = `u@${domain}`;
  expect(domain.length).toBeLessThanOrEqual(253);
  expect(isEmail(email)).toBe(true);
});

test('domain label length 63 is accepted', () => {
  const label = 'a'.repeat(63);
  const domain = `${label}.com`;
  const email = `u@${domain}`;
  expect(isEmail(email)).toBe(true);
});

test('single-character local part is accepted', () => {
  expect(isEmail('a@b.co')).toBe(true);
});

test('punycode label is accepted', () => {
  expect(isEmail('user@xn--example.com')).toBe(true);
});
