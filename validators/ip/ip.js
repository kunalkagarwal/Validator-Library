function safeString(v) {
    return v === undefined || v === null ? '' : String(v);
  }
  
  function isIpv4(s) {
    const parts = s.split('.');
    if (parts.length !== 4) return false;
    for (let p of parts) {
      if (!/^\d+$/.test(p)) return false;
      if (p.length > 1 && p.startsWith('0')) return false;
      const n = Number(p);
      if (n < 0 || n > 255) return false;
    }
    return true;
  }
  
  function isIpv6(s) {
    if (s === '::') return true;
    const parts = s.split(':');
    if (parts.length < 3 || parts.length > 8) return false;
    let emptySeen = false;
    for (let p of parts) {
      if (p.length === 0) {
        if (emptySeen) continue;
        emptySeen = true;
        continue;
      }
      if (!/^[0-9A-Fa-f]{1,4}$/.test(p)) return false;
    }
    return true;
  }
  
  function isIp(input) {
    const s = safeString(input).trim();
    if (s.length === 0) return false;
    return isIpv4(s) || isIpv6(s);
  }
  
  module.exports = isIp;
  