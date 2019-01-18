/** Check if the given credentials are valid. */
// TODO: Add regex for password validation.
export const checkCredentials = (name, password) => name && password && name.length > 0 && password.length > 0;
