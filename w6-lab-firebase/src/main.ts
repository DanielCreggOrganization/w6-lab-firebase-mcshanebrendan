import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';  
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp({
      projectId: "fir-ionic-project-e6aaf",
      appId: "1:670216321:web:ef4124c995785a803c1d80",
      storageBucket: "fir-ionic-project-e6aaf.appspot.com",
      apiKey: "AIzaSyC04cL1BpnWtg2MrETmiy-v9ZYvTCGNDP8",
      authDomain: "fir-ionic-project-e6aaf.firebaseapp.com",
      messagingSenderId: "670216321"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
});
