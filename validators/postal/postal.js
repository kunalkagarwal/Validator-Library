function postal(input) {
    if (typeof input !== 'string') return false;
    const s = input.trim();
    return /^[1-9][0-9]{5}$/.test(s);
  }
  
  module.exports = postal;