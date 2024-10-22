import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register({ email, password }: { email: string; password: string }) {
    try {
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      const ref = doc(this.firestore, `users/${credentials.user.uid}`);
      await setDoc(ref, { email });
      return credentials;
    } catch (e) {
      console.error("Error in register: ", e);
      throw e;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const credentials = await signInWithEmailAndPassword(this.auth, email, password);
      return credentials;
    } catch (e) {
      console.error("Error in login: ", e);
      throw e;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (e) {
      console.error("Error in resetPassword: ", e);
      throw e;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}