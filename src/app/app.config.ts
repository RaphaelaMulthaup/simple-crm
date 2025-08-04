import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "simple-crm-a6781", appId: "1:850154726832:web:6119c2138b8fc69293a275", storageBucket: "simple-crm-a6781.firebasestorage.app", apiKey: "AIzaSyDqDJfoa_oi03-AQi7AAYEUSRwJPTKMtFk", authDomain: "simple-crm-a6781.firebaseapp.com", messagingSenderId: "850154726832" })), provideFirestore(() => getFirestore())]
};
