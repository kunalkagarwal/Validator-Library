const isEmail = require('../../validators/email/email');

test('valid simple email', () => {
  expect(isEmail('alice@example.com')).toBe(true);
});

test('valid complex email', () => {
  expect(isEmail('a.b+c@sub.domain.co.uk')).toBe(true);
});

test('trimmed email', () => {
  expect(isEmail('  bob@domain.org  ')).toBe(true);
});

test('missing at', () => {
  expect(isEmail('notanemail')).toBe(false);
});

test('multiple at', () => {
  expect(isEmail('a@b@c.com')).toBe(false);
});

test('empty local', () => {
  expect(isEmail('@domain.com')).toBe(false);
});

test('local dot rules', () => {
  expect(isEmail('.a@domain.com')).toBe(false);
  expect(isEmail('a.@domain.com')).toBe(false);
});

test('consecutive dots', () => {
  expect(isEmail('a..b@domain.com')).toBe(false);
});

test('domain missing', () => {
  expect(isEmail('a@')).toBe(false);
});

test('domain no dot', () => {
  expect(isEmail('a@domain')).toBe(false);
});

test('bad domain labels', () => {
  expect(isEmail('a@-domain.com')).toBe(false);
  expect(isEmail('a@domain-.com')).toBe(false);
});

test('tld too short', () => {
  expect(isEmail('a@domain.c')).toBe(false);
});

test('whitespace invalid', () => {
  expect(isEmail('a@do main.com')).toBe(false);
});
