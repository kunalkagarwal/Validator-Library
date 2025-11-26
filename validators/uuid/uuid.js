function uuid(input) {
    if (typeof input !== 'string') return false;
  
    const s = input.trim();
  
    // regex for UUID v1–v5, case-insensitive
    const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
    return re.test(s);
  }
  
  module.exports = uuid;