import 'express-session';

declare module 'express-session' {
  export interface Session {
    clearSession(): Promise<void>; // DO NOT MODIFY — provided by the starter

    // Add your app's custom properties below
    authenticatedUser?: {
      userId: string;
      email: string;
      displayName: string;
      averageScore: number;
      averageTime: number;
      numCompleted: number;
    };
    isLoggedIn?: boolean;
    logInAttempts?: number;
  }
}
