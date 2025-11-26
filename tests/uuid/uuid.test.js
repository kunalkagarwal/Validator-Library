const uuid = require('../../validators/uuid/uuid');

describe('UUID Validator', () => {
  test('valid UUID versions 1–5', () => {
    expect(uuid('123e4567-e89b-12d3-a456-426655440000')).toBe(true); // v1
    expect(uuid('123e4567-e89b-22d3-a456-426655440000')).toBe(true); // v2
    expect(uuid('123e4567-e89b-32d3-a456-426655440000')).toBe(true); // v3
    expect(uuid('123e4567-e89b-42d3-a456-426655440000')).toBe(true); // v4
    expect(uuid('123e4567-e89b-52d3-a456-426655440000')).toBe(true); // v5
  });

  test('valid variants 8, 9, a, b', () => {
    expect(uuid('123e4567-e89b-42d3-8456-426655440000')).toBe(true);
    expect(uuid('123e4567-e89b-42d3-9456-426655440000')).toBe(true);
    expect(uuid('123e4567-e89b-42d3-a456-426655440000')).toBe(true);
    expect(uuid('123e4567-e89b-42d3-b456-426655440000')).toBe(true);
  });

  test('case-insensitive and trimmed', () => {
    expect(uuid(' 123E4567-E89B-42D3-A456-426655440000 ')).toBe(true);
    expect(uuid('123E4567-e89b-42d3-A456-426655440000')).toBe(true);
  });

  test('invalid: wrong version', () => {
    expect(uuid('123e4567-e89b-62d3-a456-426655440000')).toBe(false); // version 6 not allowed
    expect(uuid('123e4567-e89b-02d3-a456-426655440000')).toBe(false); // version 0 not allowed
  });

  test('invalid: wrong variant', () => {
    expect(uuid('123e4567-e89b-42d3-c456-426655440000')).toBe(false);
    expect(uuid('123e4567-e89b-42d3-d456-426655440000')).toBe(false);
    expect(uuid('123e4567-e89b-42d3-f456-426655440000')).toBe(false);
  });

  test('invalid: wrong formatting or length', () => {
    expect(uuid('123e4567e89b12d3a456426655440000')).toBe(false); // missing hyphens
    expect(uuid('123e4567-e89b-42d3-a456-42665544000')).toBe(false);  // missing 1 digit
    expect(uuid('123e4567-e89b-42d3-a456-42665544000000')).toBe(false); // too many digits
    expect(uuid('----e89b-42d3-a456-426655440000')).toBe(false);
  });

  test('invalid: non-hex characters', () => {
    expect(uuid('123e4567-e89b-42d3-g456-426655440000')).toBe(false);
    expect(uuid('zzzzzzzz-e89b-42d3-a456-426655440000')).toBe(false);
  });

  test('non-string inputs', () => {
    expect(uuid(null)).toBe(false);
    expect(uuid(undefined)).toBe(false);
    expect(uuid(12345)).toBe(false);
    expect(uuid({})).toBe(false);
  });
});
