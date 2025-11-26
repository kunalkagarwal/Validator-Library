/**
 * Very tolerant central export for Validator-Library.
 *
 * Normalizes many common export shapes so consumers always get a callable function.
 * Accepted shapes include:
 *  - module.exports = function(value) { ... }
 *  - module.exports = { validate: fn }
 *  - module.exports = { default: fn } or { default: { validate: fn } }
 *  - module.exports = { validatePhone: fn } or { isPhoneValid: fn } (function property that includes the validator key)
 *  - module.exports = { someSingleFn: fn } (if exactly one function property exists)
 *
 * If none match, the exported wrapper throws with an informative error including an export-shape summary.
 */

function summarizeShape(mod) {
  if (mod === null) return 'null';
  if (mod === undefined) return 'undefined';
  const t = typeof mod;
  if (t !== 'object') return t;
  try {
    const keys = Object.keys(mod);
    const info = {
      keys,
      hasDefault: Object.prototype.hasOwnProperty.call(mod, 'default'),
      hasValidate: Object.prototype.hasOwnProperty.call(mod, 'validate'),
      defaultType: mod.default !== undefined ? typeof mod.default : null
    };
    return `object keys=${JSON.stringify(info.keys)}, defaultType=${info.defaultType}, hasValidate=${info.hasValidate}`;
  } catch (e) {
    return 'object (uninspectable)';
  }
}

function pickFunctionFromObject(obj, keyHint) {
  // 1) exact .validate
  if (typeof obj.validate === 'function') return obj.validate;
  // 2) functions on `.default`
  if (obj.default) {
    const d = obj.default;
    if (typeof d === 'function') return d;
    if (d && typeof d.validate === 'function') return d.validate;
  }
  // 3) find single function-valued property and return it
  const functionProps = Object.keys(obj).filter(k => typeof obj[k] === 'function');
  if (functionProps.length === 1) return obj[functionProps[0]];
  // 4) try to find a function property whose name includes the keyHint (case-insensitive)
  if (keyHint) {
    const lowerHint = String(keyHint).toLowerCase();
    const match = functionProps.find(k => k.toLowerCase().includes(lowerHint));
    if (match) return obj[match];
    // also prefer names starting with common prefixes + hint
    const prefixes = ['validate', 'is', 'check', 'assert'];
    for (const p of prefixes) {
      const prefMatch = functionProps.find(k => k.toLowerCase().startsWith(p + lowerHint) || k.toLowerCase().includes(p));
      if (prefMatch) return obj[prefMatch];
    }
  }
  // 5) no suitable function found
  return null;
}

function tryGetValidator(mod, keyHint) {
  if (!mod) return null;
  if (typeof mod === 'function') return mod;
  const fromObj = pickFunctionFromObject(mod, keyHint);
  if (fromObj) return fromObj;
  return null;
}

function makeWrapper(path, maybeFn, shape) {
  if (maybeFn) return maybeFn;
  return function () {
    throw new Error(`Validator at "${path}" is not a recognized callable (export shape: ${shape})`);
  };
}

function loadValidator(relPath, keyHint) {
  // require the module; if this throws, let it bubble to surface import errors early.
  const mod = require(relPath);
  const fn = tryGetValidator(mod, keyHint);
  const shape = summarizeShape(mod);
  return makeWrapper(relPath, fn, shape);
}

const validators = {
  email: loadValidator('./validators/email/email', 'email'),
  phone: loadValidator('./validators/phone/phone', 'phone'),
  url: loadValidator('./validators/url/url', 'url'),
  ip: loadValidator('./validators/ip/ip', 'ip'),
  username: loadValidator('./validators/username/username', 'username'),
  password: loadValidator('./validators/password/password', 'password'),
  date: loadValidator('./validators/date/date', 'date'),
  creditcard: loadValidator('./validators/creditcard/creditcard', 'creditcard'),
  luhn: loadValidator('./validators/luhn/luhn', 'luhn'),
  isbn: loadValidator('./validators/isbn/isbn', 'isbn'),
  hexcolor: loadValidator('./validators/hexcolor/hexcolor', 'hexcolor'),
  postal: loadValidator('./validators/postal/postal', 'postal'),
  pan: loadValidator('./validators/pan/pan', 'pan'),
  aadhar: loadValidator('./validators/aadhar/aadhar', 'aadhar'),
  uuid: loadValidator('./validators/uuid/uuid', 'uuid'),
  time: loadValidator('./validators/time/time', 'time'),
  coordinates: loadValidator('./validators/coordinates/coordinates', 'coordinates'),
  custom: loadValidator('./validators/custom/custom', 'custom'),
  mac: loadValidator('./validators/mac/mac', 'mac'),
  jwt: loadValidator('./validators/jwt/jwt', 'jwt'),
};

// Export normalized validators
module.exports = validators;
module.exports.default = validators;
