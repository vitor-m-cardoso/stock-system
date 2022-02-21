import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
  return await bcrypt.hash(rawPassword, 10);
}

export async function comparePassword(rawPassword: string, hash: string) {
  return await bcrypt.compare(rawPassword, hash);
}
