const mac = require('../../validators/mac/mac');

describe('MAC validator', () => {
  test('valid MACs', () => {
    expect(mac('AA:BB:CC:DD:EE:FF')).toBe(true);
    expect(mac('aa-bb-cc-dd-ee-ff')).toBe(true);
    expect(mac('aabb.ccdd.eeff')).toBe(true);
  });

  test('trim allowed', () => {
    expect(mac('  AA:BB:CC:DD:EE:FF  ')).toBe(true);
  });

  test('invalid formats', () => {
    expect(mac('AA:BB:CC:DD:EE')).toBe(false);
    expect(mac('GG:HH:II:JJ:KK:LL')).toBe(false); // outside hex range
    expect(mac('12:34:56:78:9A:BC:DE')).toBe(false);
  });

  test('non-string', () => {
    expect(mac(123)).toBe(false);
    expect(mac(null)).toBe(false);
    expect(mac({})).toBe(false);
  });
});
