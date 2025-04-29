/**
 * Validates if a string is a properly formatted domain name
 * 
 * @param {string} value - The domain name to validate
 * @returns {boolean} True if the domain name is valid, false otherwise
 * 
 * @example
 * // Returns true
 * domainNameValidator("example.com");
 * 
 * @example
 * // Returns true
 * domainNameValidator("sub.example.co.uk");
 * 
 * @example
 * // Returns false
 * domainNameValidator("invalid domain");
 * 
 * @example
 * // Returns false
 * domainNameValidator("example");
 */
export function domainNameValidator(value: string) {
  const regExp = new RegExp(/^([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/);
  return regExp.test(value);
}
