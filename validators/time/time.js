function time(input) {
    if (typeof input !== 'string') return false;
  
    const s = input.trim();
  
    // Regex for HH:MM or HH:MM:SS (both must be 2 digits)
    const re = /^(\d{2}):(\d{2})(?::(\d{2}))?$/;
    const m = s.match(re);
    if (!m) return false;
  
    const hour = Number(m[1]);
    const minute = Number(m[2]);
    const second = m[3] !== undefined ? Number(m[3]) : null;
  
    if (hour < 0 || hour > 23) return false;
    if (minute < 0 || minute > 59) return false;
    if (second !== null && (second < 0 || second > 59)) return false;
  
    return true;
  }
  
  module.exports = time;