import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import crypto from 'crypto';
import { logger } from './logger'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.ENCRYPTION_KEY; // 32 bytes key

function getValidKey(): Buffer {
  if (!SECRET_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }

  // Crear un hash SHA-256 de la clave para asegurar que sea de 32 bytes
  return crypto.createHash('sha256').update(SECRET_KEY).digest();
}

export function encryptApiKey(text: string): { encrypted: string; iv: string; authTag: string } {
  try {
    const iv = crypto.randomBytes(16); // 16 bytes IV para AES-256-GCM
    const key = getValidKey();

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  } catch (error) {
    logger.error('Error encrypting API key:', error);
    throw new Error('Failed to encrypt API key');
  }
}

export function decryptApiKey(encryptedData: { encrypted: string; iv: string; authTag: string }): string {
  try {
    const key = getValidKey();
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const authTag = Buffer.from(encryptedData.authTag, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    logger.error('Error decrypting API key:', error);
    throw new Error('Failed to decrypt API key');
  }
}
