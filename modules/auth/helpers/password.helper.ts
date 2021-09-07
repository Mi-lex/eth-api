import bcrypt from 'bcrypt';

export const hashPasswordAsync = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const hashPasswordSync = (password: string) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const comparePasswords = (passwordRaw: string, passwordHash: string) =>
  bcrypt.compare(passwordRaw, passwordHash);
