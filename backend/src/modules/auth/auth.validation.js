export const validateRegisterInput = ({
  name,
  email,
  password
}) => {

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error(
      "Password must be at least 6 characters"
    );
  }
};

export const validateLoginInput = ({
  email,
  password
}) => {

  if (!email || !password) {
    throw new Error("Email and password required");
  }
};