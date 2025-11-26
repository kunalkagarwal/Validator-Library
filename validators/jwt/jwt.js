function jwt(input) {
    if (typeof input !== 'string') return false;
  
    const s = input.trim();
    const base64url = /^[A-Za-z0-9\-_]+$/;
  
    const parts = s.split('.');
    if (parts.length !== 3) return false;
  
    return base64url.test(parts[0]) &&
           base64url.test(parts[1]) &&
           base64url.test(parts[2]);
  }
  
  module.exports = jwt;
  