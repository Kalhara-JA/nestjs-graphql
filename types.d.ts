// Create a types.d.ts file in your project
import { DecodedIdToken } from 'firebase-admin/auth';

declare global {
  namespace Express {
    interface Request {
      user: DecodedIdToken;
    }
  }
}
