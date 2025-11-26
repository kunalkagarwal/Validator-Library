function creditCard(input) {
    if (typeof input !== 'string') return false;
  
    // normalize: remove spaces and dashes
    const normalized = input.replace(/[\s-]+/g, '');
  
    // digits only
    if (!/^\d+$/.test(normalized)) return false;
  
    const len = normalized.length;
    if (len < 13 || len > 19) return false;
  
    // Luhn algorithm
    let sum = 0;
    let doubleNext = false;
    // iterate from rightmost digit to leftmost
    for (let i = normalized.length - 1; i >= 0; i--) {
      let digit = normalized.charCodeAt(i) - 48; // fast numeric conversion
      if (doubleNext) {
        digit = digit * 2;
        // if result is two digits, subtract 9 (equivalent to summing digits)
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      doubleNext = !doubleNext;
    }
  
    return sum % 10 === 0;
  }
  
  module.exports = creditCard;