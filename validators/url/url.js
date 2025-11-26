function safeString(v) {
  return v === undefined || v === null ? '' : String(v);
}

function isUrl(input) {
  const s = safeString(input).trim();
  if (s.length === 0) return false;
  let testString = s;
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(s)) {
    testString = 'http://' + s;
  }
  try {
    const u = new URL(testString);
    if (!u.hostname) return false;
    if (u.hostname.includes('..')) return false;
    if (u.hostname.startsWith('-') || u.hostname.endsWith('-')) return false;
    if (/[\s]/.test(u.hostname)) return false;
    // hostname must contain only letters, digits, hyphen and dot (punycode allowed with xn--)
    const hn = u.hostname.toLowerCase();
    if (!/^(xn--)?[a-z0-9-]+(\.[a-z0-9-]+)*$/.test(hn)) return false;
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = isUrl;
