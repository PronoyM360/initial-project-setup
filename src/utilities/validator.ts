// ===================== Name Validator =====================
export const nameValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) return Promise.resolve();

  if (!/^[a-zA-Z ]+$/.test(value)) {
    return Promise.reject(
      new Error("User name must contain only alphabetic characters and spaces")
    );
  }
  if (value.length < 3) {
    return Promise.reject(
      new Error("User name must be at least 3 characters long")
    );
  }
  return Promise.resolve();
};

// ===================== Username Validator =====================
export const usernameValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) return Promise.resolve();

  if (!/^[a-zA-Z0-9](?!.*[\\._]{2})[\w.]*[a-zA-Z0-9]$/.test(value)) {
    return Promise.reject(
      new Error(
        "Username must contain only alphanumeric characters, underscores, or periods, without consecutive periods or underscores, and cannot start or end with a period or underscore."
      )
    );
  }
  if (value.length < 5) {
    return Promise.reject(
      new Error("Username must be at least 5 characters long.")
    );
  }
  if (value.length > 25) {
    return Promise.reject(new Error("Username must not exceed 25 characters."));
  }
  return Promise.resolve();
};

// ===================== Email Validator =====================
export const emailValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) return Promise.resolve();

  const allowedProviders = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "zoho.com",
    "protonmail.com",
    "mail.com",
    "yandex.com",
    "fastmail.com",
    "tutanota.com",
    "seznam.cz",
    "comcast.net",
    "att.net",
    "msn.com",
    "inbox.com",
    "outlook.co.uk",
    "mail.ru",
    "gmx.com",
    "webmail.co.za",
    "yahoo.co.uk",
    "yahoo.ca",
    "yahoo.com.au",
    "office365.com",
    "outlook.office365.com",
    "googlemail.com",
    "gsuite.com",
    "workplace.com",
    "zoho.in",
    "zoho.eu",
    "sendgrid.com",
    "mailchimp.com",
    "rackspace.com",
    "digitalocean.com",
    "turbobit.net",
  ];

  const domain = value.split("@")[1];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return Promise.reject(new Error("Please enter a valid email address"));
  }

  if (!allowedProviders.includes(domain)) {
    return Promise.reject(new Error("Please use a valid email provider."));
  }

  return Promise.resolve();
};

// ===================== Password Validator =====================
export const passwordValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) return Promise.resolve();

  if (value.length < 6) {
    return Promise.reject(
      new Error("Password is too short. It must be at least 6 characters.")
    );
  }

  if (value.length < 8) {
    return Promise.reject(
      new Error(
        "Password is weak. It should be at least 8 characters long for better security."
      )
    );
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  if (
    value.length >= 8 &&
    !(hasUpperCase || hasLowerCase || hasDigit || hasSpecialChar)
  ) {
    return Promise.reject(
      new Error(
        "Password is weak. Consider adding a mix of letters, numbers, or special characters."
      )
    );
  }

  if (hasUpperCase || hasLowerCase || hasDigit || hasSpecialChar) {
    return Promise.resolve();
  }

  return Promise.reject(
    new Error(
      "Password is weak. Please make it more complex by adding upper/lowercase letters, digits, or special characters."
    )
  );
};

// ===================== OTP Validator =====================
export const otpValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) {
    return Promise.resolve();
  }
  const otpRegex = /^\d{6}$/;
  if (!otpRegex.test(value)) {
    return Promise.reject(new Error("Please enter a valid 6-digit OTP"));
  }
  return Promise.resolve();
};

// ===================== BD Phone Number Validator =====================
export const phoneValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) return Promise.resolve();

  const bangladeshPhoneRegex = /^01[3-9]\d{8}$/;
  const internationalPhoneRegex = /^\+?[1-9]\d{1,14}$/;

  if (
    !bangladeshPhoneRegex.test(value) &&
    !internationalPhoneRegex.test(value)
  ) {
    return Promise.reject(
      new Error(
        "Please enter a valid phone number (Bangladesh or international)"
      )
    );
  }

  return Promise.resolve();
};

// ===================== Normal text Validator =====================
export const textValidator = (_: unknown, value: string): Promise<void> => {
  if (!value) return Promise.resolve();

  if (value.length < 20 || value.length > 255) {
    return Promise.reject(
      new Error("Text must be between 20 and 255 characters")
    );
  }
  const validRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-|'"`=^&\s]*$/;

  if (!validRegex.test(value)) {
    return Promise.reject(
      new Error(
        "Only letters (a-z, A-Z), numbers (0-9), special characters, and whitespace are allowed"
      )
    );
  }

  return Promise.resolve();
};

// ===================== Number Validator =====================
export const numberValidator = (_: unknown, value: number): Promise<void> => {
  if (value === undefined || value === null) {
    return Promise.reject(new Error("Value is required"));
  }

  const numberRegex = /^[+-]?\d+(\.\d+)?$/;

  if (!numberRegex.test(String(value))) {
    return Promise.reject(new Error("Please enter a valid numeric value"));
  }

  return Promise.resolve();
};
