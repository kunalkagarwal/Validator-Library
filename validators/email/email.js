function safeString(v) {
    return v === undefined || v === null ? '' : String(v);
  }
  
  function isEmail(input) {
    const s = safeString(input).trim();
    if (s.length === 0) return false;
    if (s.length > 254) return false;
  
    const atIndex = s.indexOf('@');
    if (atIndex === -1) return false;
    if (s.indexOf('@', atIndex + 1) !== -1) return false;
  
    const local = s.slice(0, atIndex);
    const domain = s.slice(atIndex + 1);
  
    if (local.length === 0 || local.length > 64) return false;
    if (local.startsWith('.') || local.endsWith('.')) return false;
    if (local.includes('..')) return false;
    if (/\s/.test(local)) return false;
  
    if (domain.length === 0 || domain.length > 253) return false;
    if (domain.startsWith('.') || domain.endsWith('.')) return false;
    if (!domain.includes('.')) return false;
  
    const labels = domain.split('.');
    const tld = labels[labels.length - 1];
    if (tld.length < 2) return false;
  
    for (let label of labels) {
      if (label.length === 0 || label.length > 63) return false;
      if (label.startsWith('-') || label.endsWith('-')) return false;
      if (/\s/.test(label)) return false;
      if (!/^[A-Za-z0-9-]+$/.test(label) && !/^xn--/.test(label.toLowerCase())) {
        return false;
      }
    }
  
    return true;
  }
  
  module.exports = isEmail;
  