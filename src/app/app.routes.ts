import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'inicio',
    loadComponent: () => import('./tab-inicio/tab-inicio.page').then(m => m.TabInicioPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'splash',
        loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
      },
      {
        path: 'libros',
        loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'detalles/:id',
        loadComponent: () => import('./tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'intercambios',
        loadComponent: () => import('./tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./tab4/tab4.page').then(m => m.Tab4Page)
      },
      {
        path: 'mensajes',
        loadComponent: () => import('./tab5/tab5.page').then(m => m.Tab5Page)
      },
      {
        path: 'register',
        loadComponent: () => import('./tab-inicio/tab-inicio.page').then(m => m.TabInicioPage)
      },
      {
        path: 'chat',
        loadComponent: () => import('./chat/chat.page').then( m => m.ChatPage)
      },
      { path: '', redirectTo: '/tabs/libros', pathMatch: 'full' }
    ],
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
];
