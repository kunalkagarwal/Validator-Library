function validateDate(input) {
    if (!input || typeof input !== 'string') return false;
    const s = input.trim();
  
    // ISO date or datetime (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS[.sss][Z|±hh:mm])
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}(?:[Tt ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2})?)?$/;
    if (isoDateRegex.test(s)) {
      // Use Date parsing for ISO; Date will be Invalid Date for bad calendar dates
      const d = new Date(s);
      if (Number.isNaN(d.getTime())) return false;
  
      // Ensure the date components match (avoid JS auto-corrections like 2021-02-30 -> Mar 2)
      const [y, m, day] = s.slice(0, 10).split('-').map(Number);
      if (d.getUTCFullYear() !== y) return false;
      if (d.getUTCMonth() + 1 !== m) return false;
      if (d.getUTCDate() !== day) return false;
      return true;
    }
  
    // DD-MM-YYYY
    const dmy = /^(\d{2})-(\d{2})-(\d{4})$/;
    const dmyMatch = s.match(dmy);
    if (dmyMatch) {
      const day = Number(dmyMatch[1]);
      const month = Number(dmyMatch[2]);
      const year = Number(dmyMatch[3]);
      // Basic range checks
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
      const dt = new Date(Date.UTC(year, month - 1, day));
      if (dt.getUTCFullYear() !== year) return false;
      if (dt.getUTCMonth() + 1 !== month) return false;
      if (dt.getUTCDate() !== day) return false;
      return true;
    }
  
    // MM/DD/YYYY
    const mdy = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const mdyMatch = s.match(mdy);
    if (mdyMatch) {
      const month = Number(mdyMatch[1]);
      const day = Number(mdyMatch[2]);
      const year = Number(mdyMatch[3]);
      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
      const dt = new Date(Date.UTC(year, month - 1, day));
      if (dt.getUTCFullYear() !== year) return false;
      if (dt.getUTCMonth() + 1 !== month) return false;
      if (dt.getUTCDate() !== day) return false;
      return true;
    }
  
    // Not a recognized format
    return false;
  }
  
  module.exports = { validateDate };