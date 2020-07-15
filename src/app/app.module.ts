import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuBarComponent } from './header/menu-bar/menu-bar.component';
import { TMTPrimengModule } from './shared/tmtprimeng.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { dropdownDirective } from './shared/directives/dropdown.directive';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    dropdownDirective,
    MenuBarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TMTPrimengModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
