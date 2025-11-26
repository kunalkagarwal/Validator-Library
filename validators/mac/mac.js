function mac(input) {
    if (typeof input !== 'string') return false;
    const s = input.trim();
  
    // colon or hyphen format
    const colonOrDash = /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/;
  
    // Cisco dotted format
    const dotted = /^[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}\.[0-9A-Fa-f]{4}$/;
  
    return colonOrDash.test(s) || dotted.test(s);
  }
  
  module.exports = mac;
  