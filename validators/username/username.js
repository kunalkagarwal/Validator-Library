function validateUsername(input) {
    if (!input || typeof input !== 'string') return false;
    const s = input.trim();
  
    // Length 3–30
    if (s.length < 3 || s.length > 30) return false;
  
    // Must start with a letter
    if (!/^[A-Za-z]/.test(s)) return false;
  
    // Allowed characters: letters, digits, dot, underscore, hyphen
    if (!/^[A-Za-z0-9._-]+$/.test(s)) return false;
  
    return true;
  }
  
  module.exports = { validateUsername };
  