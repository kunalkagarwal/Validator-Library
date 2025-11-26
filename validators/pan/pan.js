function pan(input) {
    if (typeof input !== 'string') return false;
    const s = input.trim();
    // Exact PAN pattern: 5 letters, 4 digits, 1 letter
    return /^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(s);
  }
  
  module.exports = pan;