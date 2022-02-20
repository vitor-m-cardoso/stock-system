import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
  return await bcrypt.hash(rawPassword, 10);
}
