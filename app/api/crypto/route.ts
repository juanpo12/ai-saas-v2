import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto';
import { logger } from '@/lib/logger';

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.ENCRYPTION_KEY; 

// Función para asegurar que la clave tenga exactamente 32 bytes
function getValidKey(): Buffer {
  if (!SECRET_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }
  
  // Crear un hash SHA-256 de la clave para asegurar que sea de 32 bytes
  return crypto.createHash('sha256').update(SECRET_KEY).digest();
}

function encryptText(text: string): { encrypted: string; iv: string; authTag: string } {
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
    logger.error('Error encrypting text:', error);
    throw new Error('Failed to encrypt text');
  }
}

function decryptText(encryptedData: { encrypted: string; iv: string; authTag: string }): string {
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
    logger.error('Error decrypting text:', error);
    throw new Error('Failed to decrypt text');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'encrypt':
        if (!data || typeof data !== 'string') {
          return NextResponse.json({ error: 'Text to encrypt is required' }, { status: 400 });
        }
        
        const encrypted = encryptText(data);
        return NextResponse.json({ success: true, data: encrypted });

      case 'decrypt':
        if (!data || !data.encrypted || !data.iv || !data.authTag) {
          return NextResponse.json({ error: 'Encrypted data with iv and authTag is required' }, { status: 400 });
        }
        
        const decrypted = decryptText(data);
        return NextResponse.json({ success: true, data: decrypted });

      default:
        return NextResponse.json({ error: 'Invalid action. Use "encrypt" or "decrypt"' }, { status: 400 });
    }
  } catch (error) {
    logger.error('Crypto API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

