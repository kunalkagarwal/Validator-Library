function validatePassword(input) {
    if (!input || typeof input !== 'string') return false;
    const s = input;
  
    // Length
    if (s.length < 8 || s.length > 64) return false;
  
    // No whitespace allowed
    if (/\s/.test(s)) return false;
  
    // At least one lowercase, one uppercase, one digit, one special
    if (!/[a-z]/.test(s)) return false;
    if (!/[A-Z]/.test(s)) return false;
    if (!/[0-9]/.test(s)) return false;
    if (!/[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]/.test(s)) return false;
  
    return true;
  }
  
  module.exports = { validatePassword };