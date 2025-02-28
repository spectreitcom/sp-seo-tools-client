export function domainNameValidator(value: string) {
  const regExp = new RegExp(/^([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/);
  return regExp.test(value);
}
