// Use Node's built-in crypto module to avoid requiring the missing crypto-js package.
import crypto from "crypto";

function deriveKeyAndIv(password: string, salt: Buffer) {
  const chunks: Buffer[] = [];
  let previous = Buffer.alloc(0);
  let length = 0;

  while (length < 48) {
    previous = crypto
      .createHash("md5")
      .update(Buffer.concat([previous, Buffer.from(password, "utf8"), salt]))
      .digest();
    chunks.push(previous);
    length += previous.length;
  }

  const keyAndIv = Buffer.concat(chunks);
  return { key: keyAndIv.subarray(0, 32), iv: keyAndIv.subarray(32, 48) };
}

// Encryption function
export function encrypt(text: string) {
  const password = process.env.SALT || "omg";
  const salt = crypto.randomBytes(8);
  const { key, iv } = deriveKeyAndIv(password, salt);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);

  // Match CryptoJS's OpenSSL-compatible passphrase ciphertext format.
  return Buffer.concat([Buffer.from("Salted__"), salt, encrypted]).toString("base64");
}

// Decryption function
export function decrypt(cipherText: string) {
  const password = process.env.SALT || "omg";
  const data = Buffer.from(cipherText, "base64");
  if (data.length < 16 || data.subarray(0, 8).toString() !== "Salted__") {
    throw new Error("Invalid ciphertext");
  }

  const salt = data.subarray(8, 16);
  const { key, iv } = deriveKeyAndIv(password, salt);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([
    decipher.update(data.subarray(16)),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}