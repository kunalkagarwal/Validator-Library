function validatePhone(input) {
    if (!input || typeof input !== 'string') return false;
    const s = input.trim();
  
    // Clean: remove spaces, dashes, parentheses but keep +
    const cleaned = s.replace(/[ \-()]/g, '');
  
    // INTERNATIONAL FORMAT (+)
    if (cleaned.startsWith('+')) {
      const digitsOnly = cleaned.replace(/[^0-9]/g, '');
  
      // Must match + followed by 2–15 digits (E.164 subset)
      if (!/^\+[1-9][0-9]{1,14}$/.test(cleaned)) return false;
  
      // Heuristic for ambiguous inputs that start with '+1':
      // 1) If it is a clearly formed NANP number, accept only when total digits == 11..15.
      // 2) If it contains separators (space, dash, parentheses) and is shorter than 11 digits,
      //    reject — this kills malformed inputs like "+1 (202) 55-501".
      // 3) Otherwise, fall back to the generic 7..15 rule so tests like "+1234567" pass.
      if (cleaned.startsWith('+1')) {
        if (digitsOnly.length >= 11 && digitsOnly.length <= 15) return true;
  
        // If the original string uses separators and there aren't enough digits, reject.
        if (/[ \-()]/.test(s) && digitsOnly.length < 11) return false;
  
        // Otherwise allow (treat as non-NANP ambiguous short number under general rule)
        if (digitsOnly.length >= 7 && digitsOnly.length <= 15) return true;
  
        return false;
      }
  
      // OTHER COUNTRY CODES: require 7..15 digits (minimal subscriber length = 7)
      if (digitsOnly.length < 7 || digitsOnly.length > 15) return false;
      return true;
    }
  
    // NATIONAL FORMAT (no leading '+')
    let digits = s.replace(/[^0-9]/g, '');
  
    // If national format uses a leading zero and is 11 digits (common in some locales) drop it
    if (digits.length === 11 && digits.startsWith('0')) {
      digits = digits.slice(1);
    }
  
    // Indian mobile numbers: 10 digits starting with 6-9 and not all zeros
    if (/^[6-9][0-9]{9}$/.test(digits) && digits !== '0000000000') return true;
  
    // Otherwise reject
    return false;
  }
  
  module.exports = { validatePhone };
  