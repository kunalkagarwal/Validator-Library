/**
 * Custom validator
 *
 * Usage:
 *   custom(value, { regex: /pattern/, fn: (val) => true/false })
 *
 * Behavior:
 *   - If only regex is provided -> run regex test
 *   - If only fn is provided -> run function
 *   - If both provided -> must satisfy BOTH
 *   - Trims string input before regex test
 *   - Rejects invalid definitions
 */

function custom(input, options) {
    if (!options || typeof options !== 'object') return false;
  
    const { regex, fn } = options;
  
    // Validate option types
    const hasRegex = regex instanceof RegExp;
    const hasFn = typeof fn === 'function';
  
    if (!hasRegex && !hasFn) return false;
  
    const value = typeof input === 'string' ? input.trim() : input;
  
    // If regex only
    if (hasRegex && !hasFn) {
      if (typeof value !== 'string') return false;
      return regex.test(value);
    }
  
    // If function only
    if (!hasRegex && hasFn) {
      try {
        return !!fn(value);
      } catch {
        return false;
      }
    }
  
    // Both regex AND function — must satisfy both
    if (hasRegex && hasFn) {
      if (typeof value !== 'string') return false;
      if (!regex.test(value)) return false;
  
      try {
        return !!fn(value);
      } catch {
        return false;
      }
    }
  
    return false;
  }
  
  module.exports = custom;
  