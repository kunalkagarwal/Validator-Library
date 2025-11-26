
function toNumber(v) {
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v === 'string') {
      if (v.trim() === '') return NaN;
      const n = Number(v.trim());
      return Number.isFinite(n) ? n : NaN;
    }
    return NaN;
  }
  
  function coordinates(input) {
    // Array input: [lat, lon]
    if (Array.isArray(input)) {
      if (input.length !== 2) return false;
      const lat = toNumber(input[0]);
      const lon = toNumber(input[1]);
      if (Number.isNaN(lat) || Number.isNaN(lon)) return false;
      if (lat < -90 || lat > 90) return false;
      if (lon < -180 || lon > 180) return false;
      return true;
    }
  
    // String input: "lat,lon" or "lat lon"
    if (typeof input === 'string') {
      const s = input.trim();
      if (s === '') return false;
  
      // Accept either comma or whitespace as separator (one or more), but not extra parts
      // This allows: "12.34,56.78" or "12.34 56.78" or "  -12.3,  45.6 "
      const match = s.match(/^([+-]?\d+(?:\.\d+)?)\s*(?:,|\s)\s*([+-]?\d+(?:\.\d+)?)$/);
      if (!match) return false;
  
      const lat = Number(match[1]);
      const lon = Number(match[2]);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return false;
      if (lat < -90 || lat > 90) return false;
      if (lon < -180 || lon > 180) return false;
      return true;
    }
  
    // Everything else: reject
    return false;
  }
  
  module.exports = coordinates;
  