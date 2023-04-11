import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// Social Sign In

import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { QuizModule } from './quiz/quiz.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    AppRoutingRoutingModule,
    FormsModule,
    QuizModule
  ],
  exports: [
    GoogleSigninButtonDirective
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '731557543978-9i96qugshpeki7qpllf293hh23qj67tf.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
