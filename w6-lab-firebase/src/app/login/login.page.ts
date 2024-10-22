import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const { email, password } = this.credentials.value;
    try {
      await this.authService.login({ email, password });
      // Navigate to the home page or show a success message
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: (error as Error).message, // Cast error to Error type
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async resetPassword() {
    const { email } = this.credentials.value;
    try {
      await this.authService.resetPassword(email);
      const alert = await this.alertController.create({
        header: 'Password Reset',
        message: 'Check your email for a password reset link.',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Password Reset Failed',
        message: (error as Error).message, // Cast error to Error type
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async createAccount() {
    const { email, password } = this.credentials.value;
    try {
      await this.authService.register({ email, password });
      // Navigate to the home page or show a success message
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Account Creation Failed',
        message: (error as Error).message, // Cast error to Error type
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}