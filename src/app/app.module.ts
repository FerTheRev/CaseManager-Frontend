import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WhatsappbotmainpageComponent } from './components/whatsappbotmainpage/whatsappbotmainpage.component';
import { LoginComponent } from './components/login/login.component';
import { MdbootstrapModule } from './mdbootstrap/mdbootstrap.module';
import { CreatecasesComponent } from './components/createcases/createcases.component';

import { QRCodeModule } from 'angularx-qrcode';

/* MATERIAL */
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { ConnectWspComponent } from './components/connect-wsp/connect-wsp.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    WhatsappbotmainpageComponent,
    LoginComponent,
    CreatecasesComponent,
    ConnectWspComponent,
    CreateTaskComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MdbootstrapModule,
    HttpClientModule,
    MatStepperModule,
    MatDialogModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
