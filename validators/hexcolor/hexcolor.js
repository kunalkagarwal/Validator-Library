function hexColor(input) {
    if (typeof input !== 'string') return false;
  
    // Trim whitespace
    const s = input.trim();
  
    // optional leading '#'
    const normalized = s.startsWith('#') ? s.slice(1) : s;
  
    // Only allow either 3 or 6 hex digits
    if (/^[0-9a-fA-F]{3}$/.test(normalized)) return true;
    if (/^[0-9a-fA-F]{6}$/.test(normalized)) return true;
  
    return false;
  }
  
  module.exports = hexColor;