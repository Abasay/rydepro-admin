const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

export function validatePassword(password: any) {
  if (password.length < 12) {
    return false;
  }

  if (!regex.test(password)) {
    return false;
  }

  return true;
}

const specialSymbolsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const numberRegex = /[0-9]/;
const lowerCaseRegex = /[a-z]/;
const upperCaseRegex = /[A-Z]/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateSpecialSymbols = (password: string) => {
  return specialSymbolsRegex.test(password);
};

export const validateNumber = (password: string) => {
  return numberRegex.test(password);
};

export const validateLowerCase = (password: string) => {
  return lowerCaseRegex.test(password);
};

export const validateUpperCase = (password: string) => {
  return upperCaseRegex.test(password);
};

export const validEmail = (email: string) => {
  return emailRegex.test(email);
};
