function isISBN(input) {
    if (typeof input !== 'string') return false;
  
    // Normalize: remove spaces and hyphens
    const normalized = input.replace(/[\s-]+/g, '');
  
    // ISBN-13: 13 digits
    if (/^\d{13}$/.test(normalized)) {
      // compute ISBN-13 checksum
      let sum = 0;
      for (let i = 0; i < 13; i++) {
        const digit = normalized.charCodeAt(i) - 48;
        // weight 1 for even index, 3 for odd index (0-based)
        sum += (i % 2 === 0) ? digit : digit * 3;
      }
      return sum % 10 === 0;
    }
  
    // ISBN-10: first 9 digits then check digit which may be 0-9 or X
    if (/^\d{9}[\dXx]$/.test(normalized)) {
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        let ch = normalized.charAt(i);
        let value;
        if (i === 9 && (ch === 'X' || ch === 'x')) {
          value = 10;
        } else {
          value = ch.charCodeAt(0) - 48;
        }
        sum += (10 - i) * value; // weight: 10 down to 1
      }
      return sum % 11 === 0;
    }
  
    return false;
  }
  
  module.exports = isISBN;