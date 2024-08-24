import bcrypt from "bcryptjs";

export async function hashPassword(password:string) {
  await bcrypt.hash(password, 10);
}

export async function comparePassword(password:string, userPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, userPassword);
}