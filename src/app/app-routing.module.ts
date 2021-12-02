import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WhatsappbotmainpageComponent } from './components/whatsappbotmainpage/whatsappbotmainpage.component';
import { RedirectLoggedToHomeGuard } from './guards/redirect-logged-to-home.guard';
import { RedirectToLogingGuard } from './guards/redirect-to-loging.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectLoggedToHomeGuard],
  },
  {
    path: 'whatsappbot',
    component: WhatsappbotmainpageComponent,
    canActivate: [RedirectToLogingGuard],
  },
  { path: '**', redirectTo: 'whatsappbot', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
