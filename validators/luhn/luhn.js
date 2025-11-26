function luhn(input) {
    if (typeof input !== 'string') return false;
  
    // normalize: remove spaces and dashes
    const normalized = input.replace(/[\s-]+/g, '');
  
    // must be digits only
    if (!/^\d+$/.test(normalized)) return false;
  
    let sum = 0;
    let double = false;
  
    // iterate from rightmost to leftmost
    for (let i = normalized.length - 1; i >= 0; i--) {
      let digit = normalized.charCodeAt(i) - 48; // fast numeric conversion
      if (double) {
        digit = digit * 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      double = !double;
    }
  
    return sum % 10 === 0;
  }
  
  module.exports = luhn;